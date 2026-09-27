import { MessageEvent } from '@nestjs/common';
import { type Observable } from 'rxjs';
import { ResumesService } from './resumes.service.js';
import { ResumeEventsService } from './resume-events.service.js';
export declare class ResumesController {
    private readonly resumesService;
    private readonly resumeEvents;
    constructor(resumesService: ResumesService, resumeEvents: ResumeEventsService);
    upload(file?: Express.Multer.File): Promise<{
        id: string;
        status: import("../generated/prisma/enums.js").ResumeStatus;
    }>;
    findAll(): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        error: string | null;
        id: string;
        originalName: string;
        status: import("../generated/prisma/enums.js").ResumeStatus;
        attempts: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    events(id: string): Observable<MessageEvent>;
    findOne(id: string): Promise<{
        error: string | null;
        id: string;
        originalName: string;
        filePath: string;
        sizeBytes: number;
        status: import("../generated/prisma/enums.js").ResumeStatus;
        extractedText: string | null;
        summary: import("@prisma/client/runtime/client").JsonValue | null;
        attempts: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
