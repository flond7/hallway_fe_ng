import { Component, TemplateRef } from '@angular/core';
import { PegPerson, PegGoal } from 'src/interfaces';
import { PegApiService } from '../../../services/peg-api.service';
import { faFilePdf, faPlus} from '@fortawesome/free-solid-svg-icons';
import { ChartConfiguration } from 'chart.js';
import * as GC from '../../../../constants';
// Modal imports
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from '../../../services/modals.service'

@Component({
  selector: 'app-peg-report-person',
  templateUrl: './peg-report-person.component.html',
  styleUrls: ['./peg-report-person.component.sass']
})
export class PegReportPersonComponent {
  // initial vars
  year: number = 0;

  // Goal list
  goalList: PegGoal[] = [];                     //goal list is the concat of the extra and ordinary goal lists
  extraordinaryGoalList: PegGoal[] = [];
  ordinaryGoalList: PegGoal[] = [];

  // User list and selection
  userList$: PegPerson[] = [];
  selectedUser: PegPerson = {
    id: 0,
    name: 'Seleziona',
    surname: 'Utente',
    jobCategory: '',
    manager: false,
    managerOfOffices: []
  }
  
  modalRefUser!: BsModalRef;

  // total calculation
  extraordinaryTotals: number[] = [];   //these arrays contain the result of getTotals(), weight, weight3006, weight3112, so you can access them as xxxxTotal[0], [1] or [2] in the template
  ordinaryTotals: number[] = [];

  // widgets vars
  showWidgets: boolean = false;
  ordNumber: number = 0;
  extraNumber: number = 0;

  // FA icons
  faFilePdf = faFilePdf; faPlus = faPlus;

  // strings and titles
  extraordinaryTitle: string = GC.PEG_GOAL_EXTRAORDINARY_TITLE;
  ordinaryTitle: string = GC.PEG_GOAL_ORDINARY_TITLE;

  // Css control
  primarypeg = GC.COLOR_PRIMARY_PEG;
  dark = GC.COLOR_DARK;
  white = GC.COLOR_WHITE;
  white1 = GC.COLOR_WHITE_ONE;
  white2 = GC.COLOR_WHITE_TWO;
  white3 = GC.COLOR_WHITE_THREE;

  // Doughnut charts options
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = { responsive: true, transitions: {}};
  public totalChartData: ChartConfiguration<'doughnut'>['data']['datasets'] = [      // data: [success , failure], label: 'Series A', backgroundColor: ['#success', '#failure'],
    { data: [0, 0], backgroundColor: ['#8bc34a', '#505154'], borderWidth: 0 }
  ]; 
  // graph vars
  totalWeight: number = 0;
  totalWeight_3112: number = 0;  
  totalPercent: number = 0;    
  showChart: boolean = false;   
  
  constructor(private api: PegApiService, private modalService: ModalService, public bsModalService: BsModalService) {
    const currentDate = new Date();
    this.year = currentDate.getFullYear();
    api.userListData$.subscribe(r => {
      this.userList$ = r;
      console.log(r)
    })
  }

  openModal(modal: TemplateRef<any>) {
    this.modalRefUser = this.bsModalService.show(modal);
  }
  
  selectPerson(user: PegPerson) {
    //delete the chart from the page to re-render it after getting new data
    this.showChart = false;
    this.selectedUser = user;
    const data = { year: this.year, id: this.selectedUser.id }
      this.api.getReportPerson(data).subscribe(r => {
        this.goalList = r.data;
        ///separate goals in ordinary and extraordinary
        this.ordinaryGoalList = r.data.filter((g: PegGoal) => g.type === "ordinary");
        this.extraordinaryGoalList = r.data.filter((g: PegGoal) => g.type === "extraordinary");
        //calculate values for widget
        this.countGoals();
        this.extraordinaryTotals = this.getTotals(this.extraordinaryGoalList);
        this.ordinaryTotals = this.getTotals(this.ordinaryGoalList);
        //calculate values for the chart and visualize it
        this.personPointsCalculation();
      })
  }

  countGoals() {
    this.showWidgets = true;
    this.ordNumber = this.ordinaryGoalList.length;
    this.extraNumber = this.extraordinaryGoalList.length;
  }

  getTotals(list: PegGoal[]) {
    const weight = list.reduce((sum, goal) => sum + goal.weight, 0);
    const weight3006 = list.reduce((sum, goal) => {
      if (goal.weight_3006 !== undefined) {
        return sum + goal.weight_3006;
      }
      return sum;
    }, 0)
    const weight3112 = list.reduce((sum, goal) => {
      if (goal.weight_3112 !== undefined) {
        return sum + goal.weight_3112;
      }
      return sum;
    }, 0)
    return [weight, weight3006, weight3112]
  }

  personPointsCalculation() {
    this.totalWeight_3112 = this.goalList.reduce((sum, goal) => {
      if (goal.weight_3112 !== undefined) {
        return sum + goal.weight_3112;
      }
      return sum;
    }, 0);
    this.totalWeight = this.goalList.reduce((sum, goal) => sum + goal.weight,0);
    this.updateDoughnutChart();
    this.totalPercent = (this.totalWeight_3112 / this.totalWeight) * 100;
    this.year = this.goalList[0].year;  //needed for the pdf title
  }

  updateDoughnutChart() {
    //set data = [success, failure]
    let failure = this.totalWeight - this.totalWeight_3112
    this.totalChartData[0].data = [this.totalWeight_3112, failure]
    this.showChart = true;
    console.log(this.totalChartData[0].data)
  }
  printPdf() {
    console.log('print')
  }
}
