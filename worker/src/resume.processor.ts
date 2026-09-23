import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import type { Job } from 'bullmq';
import { PrismaService } from './prisma/prisma.service.js';

@Processor('resume-processing', { concurrency: 2 })
export class ResumeProcessor extends WorkerHost {
  private readonly logger = new Logger(ResumeProcessor.name);

  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job<{ resumeId: string }>) {
    const { resumeId } = job.data;
    const attempt = job.attemptsMade + 1;

    this.logger.log(`Processing ${resumeId} (attempt ${attempt})`);

    await this.prisma.resume.update({
      where: { id: resumeId },
      data: { status: 'PROCESSING', attempts: attempt },
    });

    // Stand-in for the real work (PDF parsing lands here in step 7)
    await new Promise((resolve) => setTimeout(resolve, 5000));

    await this.prisma.resume.update({
      where: { id: resumeId },
      data: { status: 'DONE', extractedText: '(not parsed yet)' },
    });

    this.logger.log(`Done ${resumeId}`);
    return { resumeId };
  }
}