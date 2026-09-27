import { WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import { PrismaService } from './prisma/prisma.service.js';
import { PdfParserService } from './pdf/pdf-parser.service.js';
import { StatusPublisherService } from './events/status-publisher.service.js';
export declare class ResumeProcessor extends WorkerHost {
    private readonly prisma;
    private readonly pdfParser;
    private readonly statusPublisher;
    private readonly logger;
    constructor(prisma: PrismaService, pdfParser: PdfParserService, statusPublisher: StatusPublisherService);
    process(job: Job<{
        resumeId: string;
    }>): Promise<{
        resumeId: string;
        pages: number;
        chars: number;
    }>;
    onFailed(job: Job<{
        resumeId: string;
    }>, err: Error): Promise<void>;
    onCompleted(job: Job<{
        resumeId: string;
    }>): void;
}
