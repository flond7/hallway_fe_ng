import { Component } from '@angular/core';
import { PegApiService } from '../../../services/peg-api.service';
import { PegPerson, PegGoal, PegOffice } from 'src/interfaces';

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

  // selected entities for reasearch
  selectedUser: PegPerson = {
    id: 0,
    name: '',
    surname: '',
    jobCategory: '',
    manager: false,
    managerOfOffices: []
  };
  selectedManager: PegPerson = {
    id: 0,
    name: '',
    surname: '',
    jobCategory: '',
    manager: false,
    managerOfOffices: []
  };
  selectedOffice: PegOffice = {
    id: 0,
    name: ''
  }

  // goal list
  goalListPerson: PegGoal[] = [];     //used to calculate the totals for the graph

  constructor(private api: PegApiService) {}

  selectTab(tabSelected: string) {
    //reset when you change tab to avoid mistakes and showing the old data in a different tab
    this.goalListPerson = [];  

    for (const key in this.tab) {
      if (key === tabSelected) {
        (this.tab as any)[key] = true;
      } else {
        (this.tab as any)[key] = false;
      }
    }
  }

}
