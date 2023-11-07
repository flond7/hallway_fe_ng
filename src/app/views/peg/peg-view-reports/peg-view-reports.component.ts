import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { PegApiService } from '../../../services/peg-api.service';
import { PegPerson, PegGoal } from 'src/interfaces';

@Component({
  selector: 'app-peg-view-reports',
  templateUrl: './peg-view-reports.component.html',
  styleUrls: ['./peg-view-reports.component.sass']
})
export class PegViewReportsComponent {

  // initial tab values
  tab = {
    reportPerson: true,
    reportManager: false,
    reportOffice: false,
    reportPa: false
  }

  // Doughnut charts options
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = { responsive: true, transitions: {}};
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    // data: [success , failure], label: 'Series A', backgroundColor: ['#success', '#failure'],
    { data: [350, 450], backgroundColor: ['#8bc34a', '#505154'], borderWidth: 0 }
  ];

  // selected user for reasearch
  userList$: PegPerson[] = []
  selectedUser: PegPerson = {
    id: 0,
    name: '',
    surname: '',
    jobCategory: '',
    manager: false,
    managerOfOffices: []
  };

  // goal list
  goalListPerson: PegGoal[] = [];
  ordinaryGoal: PegGoal[] = [];
  extraordinaryGoal: PegGoal[] = [];
  


  //results
  totalWeight: number = 0;
  totalWeight_3112: number = 0;

  constructor(private api: PegApiService) {}

  selectTab(tabSelected: string) {
    for (const key in this.tab) {
      if (key === tabSelected) {
        (this.tab as any)[key] = true;
      } else {
        (this.tab as any)[key] = false;
      }
    }
  }

  personPointsCalculation() {
    this.totalWeight_3112 = this.goalListPerson.reduce((sum, goal) => {
      if (goal.weight_3112 !== undefined) {
        return sum + goal.weight_3112;
      }
      return sum;
    }, 0);
    this.totalWeight = this.goalListPerson.reduce((sum, goal) => sum + goal.weight,0);
  }

  getlist(e: PegGoal[]) {
    this.goalListPerson = e;

    //separate goals in ordinary and extraordinary
    this.ordinaryGoal = e.filter(g => g.type === "ordinary");
    this.extraordinaryGoal = e.filter(g => g.type === "extraordinary");



    console.log(e)
    console.log(this.ordinaryGoal)
    console.log(this.extraordinaryGoal)
  }

}
