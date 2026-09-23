import { WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import { PrismaService } from './prisma/prisma.service.js';
export declare class ResumeProcessor extends WorkerHost {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    process(job: Job<{
        resumeId: string;
    }>): Promise<{
        resumeId: string;
    }>;
}
