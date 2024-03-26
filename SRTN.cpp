
#include <iostream>
using namespace std; 

struct Process { 
	int pid; 
    int art; 
	int bt; 
	
}; 


void findTAT(Process proc[], int n, int tat[]) 
{ 
	int rt[n]; 
	int complete = 0, t = 0, minm = 999; 
	int shortest = 0, finish_time; 
	bool check = false; 

	for (int i = 0; i < n; i++) {
		rt[i] = proc[i].bt; 
	if(proc[i].bt == 0){
		complete++;
	}
	}
	while (complete != n) { 

		
		for (int j = 0; j < n; j++) { 
			if ((proc[j].art <= t) && 
			(rt[j] < minm) && rt[j] > 0) { 
				minm = rt[j]; 
				shortest = j; 
				check = true; 
			} 
		} 

		if (check == false) { 
			cout<< "| \t";
			t++; 
			continue; 
		} 
  
		rt[shortest]--;
		minm = rt[shortest];
		if(minm == 0)
		minm = 999;

		if (rt[shortest] == 0) { 
			complete++; 
			check = false; 
			finish_time = t + 1; 
			tat[shortest] = finish_time -proc[shortest].art; 

			if (tat[shortest] < 0) 
				tat[shortest] = 0; 
		}

        cout <<"|"<< proc[shortest].pid << "\t";
		t++; 
	} 
	cout<<"\n";
} 

void findWT(Process proc[], int n, 
						int tat[], int wt[]) 
{ 
	for (int i = 0; i < n; i++) 
		wt[i] = tat[i] - proc[i].bt; 
} 

void findavgTime(Process proc[], int n) 
{ 
	int wt[n], tat[n], total_wt = 0, 
					total_tat = 0; 

	findTAT(proc, n, tat); 
	findWT(proc, n, tat,wt); 
	cout << "P\t\t"
		<< "BT \t\t"
		<< "WT \t\t"
		<< "TAT \t\t \n"; 
 
	for (int i = 0; i < n; i++) { 
		total_wt = total_wt + wt[i]; 
		total_tat = total_tat + tat[i]; 
		cout << " " << proc[i].pid << "\t\t"
			<< proc[i].bt << "\t\t " << wt[i] 
			<< "\t\t " << tat[i] << endl; 
	} 

	cout << "\nAverage waiting time = "
		<< (float)total_wt / (float)n; 
	cout << "\nAverage turn around time = "
		<< (float)total_tat / (float)n; 
} 

int main() 
{ 
	
	int n;
	cout<<"Enter the number of process : ";
	cin>>n;

	cout<<"Insert the process informatio\n";

	Process proc[n];
	for(int i = 0; i < n; i++){
		cout<<"Enter the process id: ";
		cin>>proc[i].pid;
		cout<<"Enter the arrival time: ";
		cin>>proc[i].art;
		cout<<"Enter the burst time: ";
		cin>>proc[i].bt;
	} 

	findavgTime(proc, n); 

	return 0; 
}