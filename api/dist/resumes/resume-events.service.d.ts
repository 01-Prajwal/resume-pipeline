import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
export declare const STATUS_CHANNEL = "resume-status";
export type ResumeEvent = {
    resumeId: String;
    status: String;
    attempts?: Number;
    error?: String | null;
};
export declare class ResumeEventsService implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    private readonly subscriber;
    private readonly events$;
    onModuleInit(): Promise<void>;
    stream(): import("rxjs").Observable<ResumeEvent>;
    onModuleDestroy(): Promise<void>;
}
