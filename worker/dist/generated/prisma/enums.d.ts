export declare const ResumeStatus: {
    readonly QUEUED: "QUEUED";
    readonly PROCESSING: "PROCESSING";
    readonly DONE: "DONE";
    readonly FAILED: "FAILED";
};
export type ResumeStatus = (typeof ResumeStatus)[keyof typeof ResumeStatus];
