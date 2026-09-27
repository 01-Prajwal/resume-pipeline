import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  MessageEvent,
  Param,
  ParseUUIDPipe,
  Post,
  Sse,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { from, map, merge, filter, type Observable } from 'rxjs';
import { ResumesService } from './resumes.service.js';
import { ResumeEventsService } from './resume-events.service.js';

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB
import { Query } from '@nestjs/common';
import { ResumeStatus } from '../generated/prisma/enums.js';

const STATUSES = ['QUEUED', 'PROCESSING', 'DONE', 'FAILED'] as const;
@Controller('resumes')
export class ResumesController {
  constructor(
    private readonly resumesService: ResumesService,
    private readonly resumeEvents: ResumeEventsService,
  ) {}

  @Post()
  @HttpCode(202)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: MAX_UPLOAD_BYTES, files: 1 },
    }),
  )
  upload(@UploadedFile() file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Send a PDF in the "file" form field');
    }
    return this.resumesService.create(file);
  }

 @Get()
  findAll(@Query('status') status?: string) {
    if (status && !STATUSES.includes(status as (typeof STATUSES)[number])) {
      throw new BadRequestException(`status must be one of ${STATUSES.join(', ')}`);
    }
    return this.resumesService.findAll(status as ResumeStatus | undefined);
  }
  @Post(':id/retry')
  @HttpCode(202)
  retry(@Param('id', ParseUUIDPipe) id: string) {
    return this.resumesService.retry(id);
  }
  @Sse(':id/events')
  events(@Param('id', ParseUUIDPipe) id: string): Observable<MessageEvent> {
    const current$ = from(this.resumesService.findOne(id)).pipe(
      map((resume) => ({
        resumeId: resume.id,
        status: resume.status,
        attempts: resume.attempts,
        error: resume.error,
      })),
    );

    const updates$ = this.resumeEvents
      .stream()
      .pipe(filter((event) => event.resumeId === id));

    return merge(current$, updates$).pipe(map((data) => ({ data }) as MessageEvent));
  }
  @Sse('events')
  allEvents(): Observable<MessageEvent> {
    return this.resumeEvents.stream().pipe(map((data) => ({ data }) as MessageEvent));
  }
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.resumesService.findOne(id);
  }
}