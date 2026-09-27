import type { Queue } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service.js';
import { ResumeStatus } from '../generated/prisma/enums.js';
export declare class ResumesService {
    private readonly prisma;
    private readonly queue;
    constructor(prisma: PrismaService, queue: Queue);
    create(file: Express.Multer.File): Promise<{
        id: string;
        status: ResumeStatus;
    }>;
    findAll(status?: ResumeStatus): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
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
