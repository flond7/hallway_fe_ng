import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PegPerson, PegOffice, PegGoal, PegPoOffice } from 'src/interfaces';
import { PegApiService } from '../../../services/peg-api.service';
import * as GC from '../../../../constants';
import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons';

import { ChartOptions, ChartType, ChartDataset, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-peg-user-card',
  templateUrl: './peg-user-card.component.html',
  styleUrls: ['./peg-user-card.component.sass']
})
export class PegUserCardComponent implements OnInit {
  @Input() year: number = 0;
  @Input() idUser: string = '';

  userId: number = 0; //used to cast the key arriving as a string into a number
  userList$: PegPerson[] = []   //used to retrieve name and surname
  /* selectedUser: PegPerson = {
    id: 0,
    name: '',
    surname: '',
    jobCategory: '',
    manager: false,
    managerOfOffices: []
  } */

  miniPersonReport = {
    name: '',
    surname: '',
    jobCategory: '',
    percent_ordinary: 0,
    percent_extraordinary: 0,
    extraordinary_count: 0,
    ordinary_count: 0
  }

  goalList: PegGoal[] = [];     //used to calculate the totals for the graph
  extraNumero: number = 0;
  ordNumero: number = 0;

  totalWeight_3112: number = 0;
  totalWeight: number = 0;
  totalPercent: number = 0;

  // Doughnut charts options
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = { responsive: true, transitions: {}};
  public totalChartData: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [0, 0], backgroundColor: ['#8bc34a', '#505154'], borderWidth: 0 }
  ]
  totalShowChart: boolean = false;

  constructor(private api: PegApiService) {
    /* api.userListData$.subscribe(r => {
      this.userList$ = r;
      //find the user based on id and perform check to ensure is not undefined
      const foundUser = this.userList$.find(user => user.id === this.userId);
      if (foundUser !== undefined) {
        this.selectedUser = foundUser;
      }
    }) */
  }

  ngOnInit() {
    //cast userId input in number
    this.userId = Number(this.idUser);
    
    //get report to access
    let data = { year: this.year, id: this.idUser }
    this.api.getMinPersonReport(data).subscribe(r=> {
      this.miniPersonReport = r.data;
    })
    /* this.api.getReportPerson(data).subscribe(r => {
      this.goalList = r.data;
      //divide ordinar and extraordinary goals
      let extraordinaryGoalList = this.goalList.map(g => g.type === 'extraordinaryy');
      let ordinaryGoalList = this.goalList.map(g => g.type === 'ordinaryy');
      //count the goals
      this.extraNumero = extraordinaryGoalList.length;
      this.ordNumero = ordinaryGoalList.length;
      //calculate percentage
      this.calculateTotalPercent();
    }) */

    //find selected user based on id
    //this.selectedUser = this.userList$.find(user => user.id === this.userId)

  }

  calculateTotalPercent() {
    /* this.totalWeight_3112 = this.goalList.reduce((sum, goal) => {
      if (goal.weight_3112 !== undefined) {
        return sum + goal.weight_3112;
      }
      return sum;
    }, 0);
    this.totalWeight = this.goalList.reduce((sum, goal) => sum + goal.weight, 0);
    //this.updateDoughnutChart();
    this.totalPercent = (this.totalWeight_3112 / this.totalWeight) * 100;
     */this.createDataChart();
  }

  createDataChart() {
    this.totalShowChart = true
  }


}
