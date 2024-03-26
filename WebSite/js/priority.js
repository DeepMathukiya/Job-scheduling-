function findTAT(proc, n, tat) {
    let rt = new Array(n).fill(0);
    let complete = 0, t = 0, shortest = 0;
    let check = false;

    for (let i = 0; i < n; i++) {
        rt[i] = proc[i].bt;
    }

    while (complete !== n) {
        let minm = 999, min_priority = 999; // Initialize with a high value

        for (let j = 0; j < n; j++) {
            if ((proc[j].art <= t) && (rt[j] > 0) && (proc[j].priority < min_priority)) {
                minm = rt[j];
                min_priority = proc[j].priority;
                shortest = j;
                check = true;
            }
        }

        if (!check) {
            t++;
            continue;
        }

        rt[shortest]--;
        minm = rt[shortest];

        if (minm === 0) {
            minm = 999;
            complete++;
            check = false;
            let finish_time = t + 1;
            tat[shortest] = finish_time - proc[shortest].art;
            if (tat[shortest] < 0) tat[shortest] = 0;
        }

        t++;
    }
}

function findWT(proc, n, tat, wt) {
    for (let i = 0; i < n; i++)
        wt[i] = tat[i] - proc[i].bt;
}

function findavgTime(proc, n) {
    let wt = new Array(n);
    let tat = new Array(n);
    let total_wt = 0, total_tat = 0;

    findTAT(proc, n, tat);
    findWT(proc, n, tat, wt);

    console.log("P\t\tBT \t\tWT \t\tTAT \t\t ");
    console.log("-----------------------------------");

    for (let i = 0; i < n; i++) {
        total_wt = total_wt + wt[i];
        total_tat = total_tat + tat[i];
        console.log(" " + proc[i].pid + "\t\t" + proc[i].bt + "\t\t " + wt[i] + "\t\t " + tat[i]);
    }

    console.log("-----------------------------------");
    console.log("Average waiting time = " + (total_wt / n));
    console.log("Average turn around time = " + (total_tat / n));
}

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function main() {
    rl.question("Enter the number of processes: ", function (n) {
        console.log("Insert the process information");
        let proc = [];
        let count = 0;

        let processData = function () {
            if (count < parseInt(n)) {
                rl.question("Enter the process id: ", function (pid) {
                    rl.question("Enter the arrival time: ", function (art) {
                        rl.question("Enter the burst time: ", function (bt) {
                            rl.question("Enter the priority: ", function (priority) {
                                proc.push({ pid: parseInt(pid), art: parseInt(art), bt: parseInt(bt), priority: parseInt(priority) });
                                count++;
                                processData();
                            });
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
}

main();