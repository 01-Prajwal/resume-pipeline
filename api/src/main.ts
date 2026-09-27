import { NestFactory } from '@nestjs/core';
import { getQueueToken } from '@nestjs/bullmq';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import type { NestExpressApplication } from '@nestjs/platform-express';
import type { Queue } from 'bullmq';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ origin: 'http://localhost:3000' });

  // Reuse the queue instance Nest already created — don't build a second one
  const queue = app.get<Queue>(getQueueToken('resume-processing'));

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');
  createBullBoard({
    queues: [new BullMQAdapter(queue)],
    serverAdapter,
  });
  app.use('/admin/queues', serverAdapter.getRouter());

  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();