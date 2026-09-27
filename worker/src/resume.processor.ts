import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import type { Job } from 'bullmq';
import { PrismaService } from './prisma/prisma.service.js';
import { PdfParserService } from './pdf/pdf-parser.service.js';
import { StatusPublisherService } from './events/status-publisher.service.js';

@Processor('resume-processing', { concurrency: 2 })
export class ResumeProcessor extends WorkerHost {
  private readonly logger = new Logger(ResumeProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly pdfParser: PdfParserService,
    private readonly statusPublisher: StatusPublisherService,
  ) {
    super();
  }

  async process(job: Job<{ resumeId: string }>) {
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

  @OnWorkerEvent('failed')
  async onFailed(job: Job<{ resumeId: string }>, err: Error) {
    const { resumeId } = job.data;
    const maxAttempts = job.opts.attempts ?? 1;
    const isFinal = job.attemptsMade >= maxAttempts;
    const message = err.message.slice(0, 500);

    if (!isFinal) {
      this.logger.warn(
        `Attempt ${job.attemptsMade}/${maxAttempts} failed for ${resumeId}: ${err.message}`,
      );
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

  @OnWorkerEvent('completed')
  onCompleted(job: Job<{ resumeId: string }>) {
    this.logger.log(`Job ${job.id} completed`);
  }
}