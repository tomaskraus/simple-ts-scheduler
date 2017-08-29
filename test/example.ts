import * as s from "./../lib/SimpleScheduler";
import * as fs from "fs";

const sch: s.SimpleScheduler = new s.SimpleScheduler(
    (error, task: { greet: string }, a: number, b: number) => (console.log(task.greet + a + " " + b))
);

console.log(`timer1=${sch.getlastTimerAdded()}`);

sch.add(2000, { greet: "hello1 " }, 1, 2)
    .add(3000, { greet: "hello2 " });

console.log(`timer2=${sch.getlastTimerAdded()}`);

const t: s.SchedulerCallbackType = (error, task: { greet: string }, ...p) => {
    const res: number = p.reduce((prev: number, val: number) => { return prev * val; }, 0);
    console.log(task.greet + res);
};

const sch2: s.SimpleScheduler = new s.SimpleScheduler(t);
sch2.add(5000, { greet: "hello3 " }, 1, 2, 3)
    .add(6000, { greet: "hello4 " }, "a")
    .add(6000, { greet: "hello5 " }, 10)
    .add(6000, { greet: "hello6 " });



const customErrorHandler: s.ErrorCallbackType = (error) => {
    console.log("EEERRRORR=" + error);
};

const multiHandler: s.SchedulerCallbackType = (error, task: { value: number }, fileName: string) => {
    if (task.value === 3) {
        fs.readFile(fileName, (err: object, data: any) => {
            if (err) {
                error(err);
                return;
            }
            console.log(`file content:
  ${data}`);
        });
    } else if (task.value === 5) {
        error(new Error("no 5 no!"));
    } else if (task.value === 6) {
        throw new Error("unrecoverable 6!");
    }

    console.log(task.value);
};

const sch3: s.SimpleScheduler = new s.SimpleScheduler(multiHandler, customErrorHandler)
    .add(100, { value: 1 })
    .add(400, { value: 3 }, "./test/file1.txt")
    .add(500, { value: 5 });

const tt: NodeJS.Timer = sch3.add(10000, { value: 2 }, "loong task", 10000).getlastTimerAdded();

setTimeout(() => {
    clearTimeout(tt);
    console.log("timeout cleared");
}, 7000);

sch3.add(500, { value: 4 }, "./test/file2.txt")
    .add(600, { value: 3 }, "./test/file2.txt")
    .add(700, { value: 1 }, "./test/file2.txt")
    // .add(8000, { value: 6 }, "./test/file2.txt")
    .add(9000, { value: 1 }, "./test/file2.txt")
    .add(1500, { value: 2 });


const sch4: s.SimpleScheduler = new s.SimpleScheduler(multiHandler)
    .add(2000, { value: 1 })
    .add(4000, { value: 3 }, "./test/file.txt")
    .add(5000, { value: 5 });

console.log("start");
