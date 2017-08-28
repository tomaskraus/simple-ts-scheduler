import * as s from "./../lib/Scheduler";


const sch: s.Scheduler = new s.Scheduler((task: { greet: string }, a: number, b: number) => (console.log(task.greet + a + " " + b)));

sch.add(2000, { greet: "hello1 " }, 1, 2)
    .add(3000, { greet: "hello2 " });

const t: s.SchedulerCallbackType = (task: { greet: string }, ...p) => {
    const res: number = p.reduce((prev: number, val: number) => { return prev * val; }, 0);
    console.log(task.greet + res);
};

const sch2: s.Scheduler = new s.Scheduler(t);
sch2.add(5000, { greet: "hello3 " }, 1, 2, 3)
    .add(6000, { greet: "hello4 " }, "a")
    .add(6000, { greet: "hello5 " }, 10)
    .add(6000, { greet: "hello6 " });

console.log("start");
