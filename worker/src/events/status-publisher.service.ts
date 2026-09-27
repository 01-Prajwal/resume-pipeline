import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { tryCatch } from 'bullmq';
import { Redis } from 'ioredis';

export const STATUS_CHANNEL = 'resume-status';

@Injectable()

export class StatusPublisherService implements OnModuleDestroy  {
    private readonly logger = new Logger(StatusPublisherService.name);
    private readonly redis = new Redis({
host: process.env.REDIS_HOST ?? 'localhost',
port: Number(process.env.REDIS_PORT ?? 6379),
    });

    async publish(payload: {
        resumeId: string;
        status: string;
        attempts?: number;
        error?: string | null;
    }) {
        try {
            await this.redis.publish(STATUS_CHANNEL, JSON.stringify(payload));
        } catch (err) {
            this.logger.warn(`Could not publish status for ${payload.resumeId}: ${err}`);
        }

    }
    async onModuleDestroy() {

        await this.redis.quit();
    }
}   