import { ResumesService } from './resumes.service.js';
export declare class ResumesController {
    private readonly resumesService;
    constructor(resumesService: ResumesService);
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
