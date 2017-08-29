
/**
 * a type of function which handles error objects
 */
export type ErrorCallbackType = (error: object) => void;

/**
 * function that is called on a planned task when that task starts
 */
export type SchedulerCallbackType = (errorCallback: ErrorCallbackType, task: object, ...params: any[]) => void;


const defaultErrorCallback: ErrorCallbackType = (error) => {
    console.log(`***Error***: ${error}`);
};

/**
 * Schedules a tasks, provides one SchedulerCallback and one ErrorCallback for all tasks added
 *
 * @export
 * @class Scheduler
 */
export class Scheduler {
    private callback: SchedulerCallbackType;
    private errorCallback: ErrorCallbackType;

    /**
     * Creates an instance of Scheduler.
     * @param {SchedulerCallbackType} callback
     * @param {ErrorHandlerType} [errorCallback=defaultErrorCallback]
     * @memberof Scheduler
     */
    constructor(callback: SchedulerCallbackType, errorCallback: ErrorCallbackType = defaultErrorCallback) {
        this.callback = callback;
        this.errorCallback = errorCallback;
    }

    /**
     *
     *
     * @param {number} whenToExecute a number of milliseconds from now, when a task will be run
     * @param {object} task a task
     * @param {...any[]} params optional task parameters
     * @returns {Scheduler}
     * @memberof Scheduler
     */
    public add(whenToExecute: number, task: object, ...params: any[]): Scheduler {

        setTimeout(
            () => {
                this.callback(this.errorCallback, task, ...params);
            },
            whenToExecute
        );
        return this;
    }

}
