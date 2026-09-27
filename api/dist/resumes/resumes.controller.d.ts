import { MessageEvent } from '@nestjs/common';
import { type Observable } from 'rxjs';
import { ResumesService } from './resumes.service.js';
import { ResumeEventsService } from './resume-events.service.js';
import { ResumeStatus } from '../generated/prisma/enums.js';
export declare class ResumesController {
    private readonly resumesService;
    private readonly resumeEvents;
    constructor(resumesService: ResumesService, resumeEvents: ResumeEventsService);
    upload(file?: Express.Multer.File): Promise<{
        id: string;
        status: ResumeStatus;
    }>;
    findAll(status?: string): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        error: string | null;
        id: string;
        originalName: string;
        status: ResumeStatus;
        attempts: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    retry(id: string): Promise<{
        id: string;
        status: ResumeStatus;
    }>;
    events(id: string): Observable<MessageEvent>;
    allEvents(): Observable<MessageEvent>;
    findOne(id: string): Promise<{
        error: string | null;
        id: string;
        originalName: string;
        filePath: string;
        sizeBytes: number;
        status: ResumeStatus;
        extractedText: string | null;
        summary: import("@prisma/client/runtime/client").JsonValue | null;
        attempts: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
