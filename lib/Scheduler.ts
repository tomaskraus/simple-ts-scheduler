// import * as assert from "assert";

// type SchedulerTaskType = { timeWhenExec: number, task: (x: any) => any };


export type SchedulerCallbackType = (task: object, ...params: any[]) => void;


export class Scheduler {
    private callbackHandler: SchedulerCallbackType;

    constructor(callbackHandler: SchedulerCallbackType) {
        this.callbackHandler = callbackHandler;
    }

    public add(whenToExecute: number, task: object, ...params: any[]): Scheduler {

        setTimeout(
            () => {
                try {
                    this.callbackHandler(task, ...params);
                } catch (e) {
                    console.log(`*** ERROR ***: ${e}`);
                }
            },
            whenToExecute
        );
        return this;
    }

}
