import * as s from "./../lib/Scheduler";
import * as fs from "fs";

const sch: s.Scheduler = new s.Scheduler((error, task: { greet: string }, a: number, b: number) => (console.log(task.greet + a + " " + b)));

sch.add(2000, { greet: "hello1 " }, 1, 2)
    .add(3000, { greet: "hello2 " });

const t: s.SchedulerCallbackType = (error, task: { greet: string }, ...p) => {
    const res: number = p.reduce((prev: number, val: number) => { return prev * val; }, 0);
    console.log(task.greet + res);
};

const sch2: s.Scheduler = new s.Scheduler(t);
sch2.add(5000, { greet: "hello3 " }, 1, 2, 3)
    .add(6000, { greet: "hello4 " }, "a")
    .add(6000, { greet: "hello5 " }, 10)
    .add(6000, { greet: "hello6 " });



const customErrorHandler: s.ErrorHandlerType = (error) => {
    console.log("EEERRRORR=" + error);
};

const multiHandler: s.SchedulerCallbackType = (error, task: { value: number }, fileName: string) => {
    if (task.value === 3) {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                error(err);
            }
            console.log(`file content:
  ${data}`);
        });
    } else if (task.value === 5) {
        error(new Error("no 5 no!"));
    }

    console.log(task.value);
};

const sch3: s.Scheduler = new s.Scheduler(multiHandler, customErrorHandler)
    .add(100, { value: 1 })
    .add(400, { value: 3 }, "./test/file1.txt")
    .add(500, { value: 5 })
    .add(500, { value: 4 }, "./test/file2.txt")
    .add(600, { value: 3 }, "./test/file2.txt")
    .add(1500, { value: 2 });

console.log("start");
