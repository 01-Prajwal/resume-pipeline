var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ResumeEventsService_1;
import { Injectable, Logger } from "@nestjs/common";
import { Redis } from 'ioredis';
import { Subject } from "rxjs";
export const STATUS_CHANNEL = 'resume-status';
let ResumeEventsService = ResumeEventsService_1 = class ResumeEventsService {
    logger = new Logger(ResumeEventsService_1.name);
    subscriber = new Redis({
        host: process.env.REDIS_HOST ?? 'localhost',
        port: Number(process.env.REDIS_PORT ?? 6379),
    });
    events$ = new Subject();
    async onModuleInit() {
        await this.subscriber.subscribe(STATUS_CHANNEL);
        this.subscriber.on('message', (_channel, raw) => {
            try {
                this.events$.next(JSON.parse(raw));
            }
            catch {
                this.logger.warn(`Ignoring malformed event: ${raw}`);
            }
        });
        this.logger.log(`Subscribed to ${STATUS_CHANNEL}`);
    }
    stream() {
        return this.events$.asObservable();
    }
    async onModuleDestroy() {
        this.events$.complete();
        await this.subscriber.quit();
    }
};
ResumeEventsService = ResumeEventsService_1 = __decorate([
    Injectable()
], ResumeEventsService);
export { ResumeEventsService };
//# sourceMappingURL=resume-events.service.js.map