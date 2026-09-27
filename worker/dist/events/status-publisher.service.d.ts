import { OnModuleDestroy } from '@nestjs/common';
export declare const STATUS_CHANNEL = "resume-status";
export declare class StatusPublisherService implements OnModuleDestroy {
    private readonly logger;
    private readonly redis;
    publish(payload: {
        resumeId: string;
        status: string;
        attempts?: number;
        error?: string | null;
    }): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
