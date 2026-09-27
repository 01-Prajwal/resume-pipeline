import { Injectable , Logger , OnModuleDestroy , OnModuleInit } from "@nestjs/common";
import {Redis } from 'ioredis';
import { Subject } from "rxjs";


export const STATUS_CHANNEL = 'resume-status';

export type ResumeEvent = {

    resumeId : String ;
    status : String ;
    attempts? : Number ;
    error? : String | null ;
}

@Injectable()
export class ResumeEventsService implements OnModuleInit , OnModuleDestroy {
    private readonly logger = new Logger(ResumeEventsService.name);
    private readonly subscriber  = new Redis({

        host : process.env.REDIS_HOST ?? 'localhost',
        port : Number(process.env.REDIS_PORT ?? 6379),
    });

  private readonly events$ = new Subject<ResumeEvent>();
 async onModuleInit() {
    await this.subscriber.subscribe(STATUS_CHANNEL);
    this.subscriber.on('message', (_channel, raw) => {
      try {
        this.events$.next(JSON.parse(raw) as ResumeEvent);
      } catch {
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
}