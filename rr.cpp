#include <iostream>
#include <vector>
#include <algorithm>
#include <iomanip>

using namespace std;

struct Process {
    int pid;
    int art;
    int bt;
    int remaining_time;
    int wt;
    int tat;
};

void round_robin_scheduling(vector<Process>& processes, int time_quantum) {
    int n = processes.size();
    int current_time = 0;
    vector<int> remaining_bt(n, 0);
    vector<bool> is_completed(n, false);

    for (int i = 0; i < n; i++) {
        remaining_bt[i] = processes[i].bt;
    }

    int completed_processes = 0;
    int index = 0;
    bool is_first_process = true;

    cout << "Gantt Chart:\n";

    while (completed_processes != n) {
        bool is_cpu_idle = true;
        for (int i = 0; i < n; i++) {
            if (processes[i].art <= current_time && !is_completed[i]) {
                is_cpu_idle = false;
                if (is_first_process) {
                    cout << "| " << setw(2) << processes[i].pid << " ";
                    is_first_process = false;
                } else {
                    cout << "| " << setw(2) << processes[i].pid << " ";
                }
                if (remaining_bt[i] > time_quantum) {
                    current_time += time_quantum;
                    remaining_bt[i] -= time_quantum;
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
            cout << "| -- ";
        }
    }
    cout << "|\n";
}

void print_results(vector<Process>& processes) {
    cout << "P\t\tBT\tWT\tTAT\n";
    float total_wt = 0, total_tat = 0;
    for (int i = 0; i < processes.size(); i++) {
        cout << processes[i].pid << "\t\t" << processes[i].bt << "\t" << processes[i].wt << "\t" << processes[i].tat << endl;
        total_wt += processes[i].wt;
        total_tat += processes[i].tat;
    }
    cout << "\nAverage Waiting Time: " << total_wt / processes.size() << endl;
    cout << "Average Turnaround Time: " << total_tat / processes.size() << endl;
}

int main() {
    int n;
    cout << "Enter the number of processes: ";
    cin >> n;

    vector<Process> processes(n);
    cout << "Insert the process information\n";
    for (int i = 0; i < n; i++) {
        cout << "Enter the process id: ";
        cin >> processes[i].pid;
        cout << "Enter the arrival time: ";
        cin >> processes[i].art;
        cout << "Enter the burst time: ";
        cin >> processes[i].bt;
        processes[i].remaining_time = processes[i].bt;
        processes[i].wt = 0;
        processes[i].tat = 0;
    }

    int time_quantum;
    cout << "Enter the time quantum: ";
    cin >> time_quantum;

    round_robin_scheduling(processes, time_quantum);
    print_results(processes);

    return 0;
}