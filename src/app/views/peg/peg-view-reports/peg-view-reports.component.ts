import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { PegApiService } from '../../../services/peg-api.service';
import { PegPerson } from 'src/interfaces';

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
  
  constructor(private api: PegApiService) {
   }

  selectTab(tabSelected: string) {
    for (const key in this.tab) {
      if (key === tabSelected) {
        (this.tab as any)[key] = true;
      } else {
        (this.tab as any)[key] = false;
      }
    }
  }



}
