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
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service.js';
let ResumeProcessor = ResumeProcessor_1 = class ResumeProcessor extends WorkerHost {
    prisma;
    logger = new Logger(ResumeProcessor_1.name);
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    async process(job) {
        const { resumeId } = job.data;
        const attempt = job.attemptsMade + 1;
        this.logger.log(`Processing ${resumeId} (attempt ${attempt})`);
        await this.prisma.resume.update({
            where: { id: resumeId },
            data: { status: 'PROCESSING', attempts: attempt },
        });
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await this.prisma.resume.update({
            where: { id: resumeId },
            data: { status: 'DONE', extractedText: '(not parsed yet)' },
        });
        this.logger.log(`Done ${resumeId}`);
        return { resumeId };
    }
};
ResumeProcessor = ResumeProcessor_1 = __decorate([
    Processor('resume-processing', { concurrency: 2 }),
    __metadata("design:paramtypes", [PrismaService])
], ResumeProcessor);
export { ResumeProcessor };
//# sourceMappingURL=resume.processor.js.map