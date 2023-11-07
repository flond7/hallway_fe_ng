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
  /* public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    // data: [success , failure], label: 'Series A', backgroundColor: ['#success', '#failure'],
    { data: [0, 0], backgroundColor: ['#8bc34a', '#505154'], borderWidth: 0 }
  ]; */
  // data: [success , failure], label: 'Series A', backgroundColor: ['#success', '#failure'],
  public extraordinaryChartData: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [0, 0], backgroundColor: ['#8bc34a', '#505154'], borderWidth: 0 }
  ]; 
  public ordinaryChartData: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [0, 0], backgroundColor: ['#8bc34a', '#505154'], borderWidth: 0 }
  ]
  public totalChartData: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [0, 0], backgroundColor: ['#8bc34a', '#505154'], borderWidth: 0 }
  ]

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
  goalListPerson: PegGoal[] = [];     //used to calculate the totals for the graph
  ordinaryGoal: PegGoal[] = [];       //used to separate the two types of goals
  extraordinaryGoal: PegGoal[] = [];  //used to separate the two types of goals

  //charts var
  extraordinarySuccess = 0;
  extraordinaryTotal = 0;
  ordinarySuccess = 0;
  ordinaryTotal = 0;

  totalShowChart: boolean = false;


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
    this.updateDoughnutChart();
  }

  updateDoughnutChart() {
    //set data = [success, failure]
    let failure = this.totalWeight - this.totalWeight_3112
    this.totalChartData[0].data = [this.totalWeight_3112, failure]
    this.totalShowChart = true;
  }


  getlist(e: PegGoal[]) {
    this.goalListPerson = e;
    //separate goals in ordinary and extraordinary
    this.ordinaryGoal = e.filter(g => g.type === "ordinary");
    this.extraordinaryGoal = e.filter(g => g.type === "extraordinary");

    this.personPointsCalculation();

    //cal extraordinary and ordinary totals and success
    this.extraordinaryTotal = this.extraordinaryGoal.reduce((sum, goal) => sum + goal.weight, 0);
    this.extraordinarySuccess = this.extraordinaryGoal.reduce((sum, goal) => {
      if (goal.weight_3112 !== undefined) {
        return sum + goal.weight_3112;
      }
      return sum;}, 0)

    this.ordinaryTotal = this.ordinaryGoal.reduce((sum, goal) => sum + goal.weight, 0);
    this.ordinarySuccess = this.ordinaryGoal.reduce((sum, goal) => {
      if (goal.weight_3112 !== undefined) {
        return sum + goal.weight_3112;
      }
      return sum;}, 0)
    
    //this.goalTotalCalc(this.ordinaryTotal, this.ordinaryGoal, this.ordinarySuccess)
  }

}
