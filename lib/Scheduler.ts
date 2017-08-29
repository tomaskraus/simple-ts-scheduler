// import * as assert from "assert";

// type SchedulerTaskType = { timeWhenExec: number, task: (x: any) => any };

export type ErrorHandlerType = (error: { message: string, name: string }) => void;

export type SchedulerCallbackType = (errorHandler: ErrorHandlerType, task: object, ...params: any[]) => void;

const defaultErrorHandler: ErrorHandlerType = (error) => {
    console.log(`***Error***: ${error}`);
};

export class Scheduler {
    private callbackHandler: SchedulerCallbackType;
    private errorHandler: ErrorHandlerType;

    constructor(callbackHandler: SchedulerCallbackType, errorHandler: ErrorHandlerType = defaultErrorHandler) {
        this.callbackHandler = callbackHandler;
        this.errorHandler = errorHandler;
    }

    public add(whenToExecute: number, task: object, ...params: any[]): Scheduler {

        setTimeout(
            () => {
                this.callbackHandler(this.errorHandler, task, ...params);
            },
            whenToExecute
        );
        return this;
    }

}
