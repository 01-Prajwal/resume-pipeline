import { Module } from '@nestjs/common';
import { ResumesController } from './resumes.controller.js';
import { ResumesService } from './resumes.service.js';
import { BullModule } from '@nestjs/bullmq';

@Module({
imports: [
  BullModule.registerQueue({
    name: 'resume-processing',
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2000 },
      removeOnComplete: { age: 3600, count: 100 },
      removeOnFail: false,
    },
  }),
],
  controllers: [ResumesController],
  providers: [ResumesService]
})
export class ResumesModule {}
