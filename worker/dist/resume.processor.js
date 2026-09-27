var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ResumeProcessor_1;
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service.js';
import { PdfParserService } from './pdf/pdf-parser.service.js';
import { StatusPublisherService } from './events/status-publisher.service.js';
let ResumeProcessor = ResumeProcessor_1 = class ResumeProcessor extends WorkerHost {
    prisma;
    pdfParser;
    statusPublisher;
    logger = new Logger(ResumeProcessor_1.name);
    constructor(prisma, pdfParser, statusPublisher) {
        super();
        this.prisma = prisma;
        this.pdfParser = pdfParser;
        this.statusPublisher = statusPublisher;
    }
    async process(job) {
        const { resumeId } = job.data;
        const attempt = job.attemptsMade + 1;
        this.logger.log(`Processing ${resumeId} (attempt ${attempt})`);
        const resume = await this.prisma.resume.update({
            where: { id: resumeId },
            data: { status: 'PROCESSING', attempts: attempt },
        });
        await this.statusPublisher.publish({
            resumeId,
            status: 'PROCESSING',
            attempts: attempt,
        });
        const { text, pages } = await this.pdfParser.parse(resume.filePath);
        await this.prisma.resume.update({
            where: { id: resumeId },
            data: { status: 'DONE', extractedText: text },
        });
        await this.statusPublisher.publish({
            resumeId,
            status: 'DONE',
            attempts: attempt,
        });
        this.logger.log(`Done ${resumeId} — ${text.length} chars from ${pages} pages`);
        return { resumeId, pages, chars: text.length };
    }
    async onFailed(job, err) {
        const { resumeId } = job.data;
        const maxAttempts = job.opts.attempts ?? 1;
        const isFinal = job.attemptsMade >= maxAttempts;
        const message = err.message.slice(0, 500);
        if (!isFinal) {
            this.logger.warn(`Attempt ${job.attemptsMade}/${maxAttempts} failed for ${resumeId}: ${err.message}`);
            await this.prisma.resume.update({
                where: { id: resumeId },
                data: { error: message },
            });
            await this.statusPublisher.publish({
                resumeId,
                status: 'PROCESSING',
                attempts: job.attemptsMade,
                error: message,
            });
            return;
        }
        this.logger.error(`Giving up on ${resumeId} after ${maxAttempts} attempts: ${err.message}`);
        await this.prisma.resume.update({
            where: { id: resumeId },
            data: { status: 'FAILED', error: message },
        });
        await this.statusPublisher.publish({
            resumeId,
            status: 'FAILED',
            attempts: job.attemptsMade,
            error: message,
        });
    }
    onCompleted(job) {
        this.logger.log(`Job ${job.id} completed`);
    }
};
__decorate([
    OnWorkerEvent('failed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Error]),
    __metadata("design:returntype", Promise)
], ResumeProcessor.prototype, "onFailed", null);
__decorate([
    OnWorkerEvent('completed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], ResumeProcessor.prototype, "onCompleted", null);
ResumeProcessor = ResumeProcessor_1 = __decorate([
    Processor('resume-processing', { concurrency: 2 }),
    __metadata("design:paramtypes", [PrismaService,
        PdfParserService,
        StatusPublisherService])
], ResumeProcessor);
export { ResumeProcessor };
//# sourceMappingURL=resume.processor.js.map