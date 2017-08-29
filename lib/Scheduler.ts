// import * as assert from "assert";

// type SchedulerTaskType = { timeWhenExec: number, task: (x: any) => any };

export type ErrorHandlerType = (error: { message: string, name: string }) => void;

export type SchedulerCallbackType = (errorHandler: ErrorHandlerType, task: object, ...params: any[]) => void;

const errHandler: ErrorHandlerType = (error) => {
    console.log(`***Error***: ${error}`);
};

export class Scheduler {
    private callbackHandler: SchedulerCallbackType;

    constructor(callbackHandler: SchedulerCallbackType) {
        this.callbackHandler = callbackHandler;
    }

    public add(whenToExecute: number, task: object, ...params: any[]): Scheduler {

        setTimeout(
            () => {
                this.callbackHandler(errHandler, task, ...params);
            },
            whenToExecute
        );
        return this;
    }

}
