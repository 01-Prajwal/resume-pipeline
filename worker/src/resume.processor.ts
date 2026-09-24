import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import type { Job } from 'bullmq';
import { PrismaService } from './prisma/prisma.service.js';
import { PdfParserService } from './pdf/pdf-parser.service.js';

@Processor('resume-processing', { concurrency: 2 })
export class ResumeProcessor extends WorkerHost {
  private readonly logger = new Logger(ResumeProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly pdfParser: PdfParserService,
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

    const { text, pages } = await this.pdfParser.parse(resume.filePath);

    await this.prisma.resume.update({
      where: { id: resumeId },
      data: { status: 'DONE', extractedText: text },
    });

    this.logger.log(`Done ${resumeId} — ${text.length} chars from ${pages} pages`);
    return { resumeId, pages, chars: text.length };
  }
}