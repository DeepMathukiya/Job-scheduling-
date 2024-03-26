class Process {
    constructor(pid, art, bt) {
        this.pid = pid;
        this.art = art;
        this.bt = bt;
        this.remaining_time = bt;
        this.wt = 0;
        this.tat = 0;
    }
}

function roundRobinScheduling(processes, timeQuantum) {
    let n = processes.length;
    let current_time = 0;
    let remaining_bt = new Array(n).fill(0);
    let is_completed = new Array(n).fill(false);

    for (let i = 0; i < n; i++) {
        remaining_bt[i] = processes[i].bt;
    }

    let completed_processes = 0;
    let is_first_process = true;

    console.log("Gantt Chart:");
    while (completed_processes != n) {
        let is_cpu_idle = true;
        for (let i = 0; i < n; i++) {
            if (processes[i].art <= current_time && !is_completed[i]) {
                is_cpu_idle = false;
                if (is_first_process) {
                    process.stdout.write("| " + processes[i].pid + " ");
                    is_first_process = false;
                } else {
                    process.stdout.write("| " + processes[i].pid + " ");
                }
                if (remaining_bt[i] > timeQuantum) {
                    current_time += timeQuantum;
                    remaining_bt[i] -= timeQuantum;
                } else {
                    current_time += remaining_bt[i];
                    processes[i].wt = current_time - processes[i].bt - processes[i].art;
                    processes[i].tat = processes[i].wt + processes[i].bt;
                    remaining_bt[i] = 0;
                    is_completed[i] = true;
                    completed_processes++;
                }
            }
        }

        if (is_cpu_idle) {
            current_time++;
            process.stdout.write("| -- ");
        }
    }
    console.log("|");
}

function printResults(processes) {
    console.log("P\t\tBT\tWT\tTAT");
    let total_wt = 0, total_tat = 0;
    for (let i = 0; i < processes.length; i++) {
        console.log(processes[i].pid + "\t\t" + processes[i].bt + "\t" + processes[i].wt + "\t" + processes[i].tat);
        total_wt += processes[i].wt;
        total_tat += processes[i].tat;
    }
    console.log("\nAverage Waiting Time: " + total_wt / processes.length);
    console.log("Average Turnaround Time: " + total_tat / processes.length);
}

function main() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter the number of processes: ", function (n) {
        let processes = [];
        console.log("Insert the process information");
        let count = 0;
        let processData = function () {
            if (count < parseInt(n)) {
                rl.question("Enter the process id: ", function (pid) {
                    rl.question("Enter the arrival time: ", function (art) {
                        rl.question("Enter the burst time: ", function (bt) {
                            processes.push(new Process(parseInt(pid), parseInt(art), parseInt(bt)));
                            count++;
                            processData();
                        });
                    });
                });
            } else {
                rl.question("Enter the time quantum: ", function (timeQuantum) {
                    roundRobinScheduling(processes, parseInt(timeQuantum));
                    printResults(processes);
                    rl.close();
                });
            }
        };
        processData();
    });
}

main();
