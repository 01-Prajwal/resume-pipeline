var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StatusPublisherService_1;
import { Injectable, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';
export const STATUS_CHANNEL = 'resume-status';
let StatusPublisherService = StatusPublisherService_1 = class StatusPublisherService {
    logger = new Logger(StatusPublisherService_1.name);
    redis = new Redis({
        host: process.env.REDIS_HOST ?? 'localhost',
        port: Number(process.env.REDIS_PORT ?? 6379),
    });
    async publish(payload) {
        try {
            await this.redis.publish(STATUS_CHANNEL, JSON.stringify(payload));
        }
        catch (err) {
            this.logger.warn(`Could not publish status for ${payload.resumeId}: ${err}`);
        }
    }
    async onModuleDestroy() {
        await this.redis.quit();
    }
};
StatusPublisherService = StatusPublisherService_1 = __decorate([
    Injectable()
], StatusPublisherService);
export { StatusPublisherService };
//# sourceMappingURL=status-publisher.service.js.map