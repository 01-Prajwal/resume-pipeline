import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ResumesService } from './resumes.service.js';

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB
@Controller('resumes')
export class ResumesController {


    constructor(private readonly resumesService: ResumesService) {}
    @Post()
    @HttpCode(202)
    @UseInterceptors(
        FileInterceptor('file', {
            storage : memoryStorage(),
            limits :{ fileSize: MAX_UPLOAD_BYTES , files: 1 }
        }),
    )
    upload(@UploadedFile() file?:Express.Multer.File) {
        if(!file) {
           throw new BadRequestException('Send a PDF in the "file" form field');
        }
     return this.resumesService.create(file);
    }

    @Get()
    findAll() {
        return this.resumesService.findAll();
    }
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.resumesService.findOne(id);
    }
}
