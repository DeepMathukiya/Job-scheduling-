class Process {
    constructor(pid, art, bt) {
        this.pid = pid;
        this.art = art;
        this.bt = bt;
    }
}

function findTAT(proc, n, tat) {
    let rt = new Array(n).fill(0);
    let complete = 0, t = 0, minm = 999;
    let shortest = 0, finish_time;
    let check = false;

    for (let i = 0; i < n; i++) {
        rt[i] = proc[i].bt;
        if (proc[i].bt === 0) {
            complete++;
        }
    }

    while (complete !== n) {
        for (let j = 0; j < n; j++) {
            if (proc[j].art <= t && rt[j] < minm && rt[j] > 0) {
                minm = rt[j];
                shortest = j;
                check = true;
            }
        }

        if (!check) {
            process.stdout.write("| \t");
            t++;
            continue;
        }

        rt[shortest]--;
        minm = rt[shortest];
        if (minm === 0) {
            minm = 999;
        }

        if (rt[shortest] === 0) {
            complete++;
            check = false;
            finish_time = t + 1;
            tat[shortest] = finish_time - proc[shortest].art;

            if (tat[shortest] < 0) {
                tat[shortest] = 0;
            }
        }

        process.stdout.write("|" + proc[shortest].pid + "\t");
        t++;
    }

    console.log("\n");
}

function findWT(proc, n, tat, wt) {
    for (let i = 0; i < n; i++) {
        wt[i] = tat[i] - proc[i].bt;
    }
}

function findavgTime(proc, n) {
    let wt = new Array(n);
    let tat = new Array(n);
    let total_wt = 0, total_tat = 0;

    findTAT(proc, n, tat);
    findWT(proc, n, tat, wt);

    console.log("P\t\tBT\t\tWT\t\tTAT\n");

    for (let i = 0; i < n; i++) {
        total_wt += wt[i];
        total_tat += tat[i];
        console.log(proc[i].pid + "\t\t" + proc[i].bt + "\t\t" + wt[i] + "\t\t" + tat[i]);
    }

    console.log("\nAverage waiting time = " + (total_wt / n));
    console.log("Average turn around time = " + (total_tat / n));
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter the number of processes: ", function (n) {
    console.log("Insert the process information");
    let proc = [];
    let count = 0;
    let processData = function () {
        if (count < parseInt(n)) {
            rl.question("Enter the process id: ", function (pid) {
                rl.question("Enter the arrival time: ", function (art) {
                    rl.question("Enter the burst time: ", function (bt) {
                        proc.push(new Process(parseInt(pid), parseInt(art), parseInt(bt)));
                        count++;
                        processData();
                    });
                });
            });
        } else {
            findavgTime(proc, parseInt(n));
            rl.close();
        }
    };
    processData();
});
