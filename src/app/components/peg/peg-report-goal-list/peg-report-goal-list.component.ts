import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { PegApiService } from '../../../services/peg-api.service';
import { PegPerson, PegGoal } from 'src/interfaces';
import * as GC from '../../../../constants'

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

enum PageOrientation {
  Portrait = 'portrait',
  Landscape = 'landscape',
}

@Component({
  selector: 'app-peg-report-goal-list',
  templateUrl: './peg-report-goal-list.component.html',
  styleUrls: ['./peg-report-goal-list.component.sass']
})
export class PegReportGoalListComponent {
  
  @Input() list: PegGoal[] = [];
  @Input() name: string = '';       //the parent passes the name of the person / po / office according to the tab where it is. Needed for the PDF
  //@Output() goalListPerson = new EventEmitter<PegGoal[]>();

  // Doughnut charts options
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = { responsive: true, transitions: {}};
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

  //results
  totalWeight: number = 0;
  totalWeight_3112: number = 0;
  totalPercent: number = 0;
  totalShowChart: boolean = false;

  //PDF
  pdfTitle: string = "";
  pdfWidths = ['auto'];
  arrayOfKeys = GC.PEG_PDF_ACCESS_KEYS; 
  year: number = 0;
  pdfBodyOrdinary = [GC.PEG_PDF_ACCESS_KEYS];
  pdfBodyExtraordinary = [GC.PEG_PDF_ACCESS_KEYS];  //needed so the first row are the headers

  constructor(private api: PegApiService) { }

  ngOnInit() {
    //pass it here so you know the value exist and it's readable
    this.getlist(this.list)
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
     this.totalPercent = (this.totalWeight_3112 / this.totalWeight) * 100;
     this.year = this.goalListPerson[0].year;  //needed for the pdf title
   }
 
   updateDoughnutChart() {
     //set data = [success, failure]
     let failure = this.totalWeight - this.totalWeight_3112
     this.totalChartData[0].data = [this.totalWeight_3112, failure]
     this.totalShowChart = true;
     console.log(this.totalChartData[0].data)
   }
 
 
   getlist(e: PegGoal[]) {
     this.goalListPerson = e;
 
     //separate goals in ordinary and extraordinary
     this.ordinaryGoal = e.filter(g => g.type === "ordinary");
     this.extraordinaryGoal = e.filter(g => g.type === "extraordinary");
 
     this.personPointsCalculation();
     
     this.createPdfTable()    //used for PDF
 
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
   }
 
   createPdfTable() {
      this.ordinaryGoal.map(goal => {
       const pdfGoal = [goal.name, goal.office.name, goal.weight.toString(), goal.percent_3112.toString()]
       this.pdfBodyOrdinary.push(pdfGoal)
     })
 
     this.extraordinaryGoal.map(goal => {
       const pdfGoal = [goal.name, goal.office.name, goal.weight.toString(), goal.percent_3112.toString()]
       this.pdfBodyExtraordinary.push(pdfGoal)
     })
   }
 
   generatePdf() {
     this.pdfTitle = this.name + " - anno: " + this.year;
     const documentDefinition = {
       pageOrientation: PageOrientation.Portrait,
       content: [
         { text: this.pdfTitle, style: 'header' },
         { text: ' ' }, //empty line for aesthetic purposes
         { text: GC.PEG_GOAL_EXTRAORDINARY_TITLE, style: 'h2' },
         {
           table: {
             headerRows: 1,
             widths: [220, 100, 30, 50, 50],
             body: this.pdfBodyExtraordinary,
           }
         },
         { text: ' ' }, //empty line for aesthetic purposes
         { text: GC.PEG_GOAL_ORDINARY_TITLE, style: 'h2' },
         {
           table: {
             headerRows: 1,
             widths: [220, 100, 30, 50, 50],
             body: this.pdfBodyOrdinary,
           }
         },
         { text: ' ' }, //empty line for aesthetic purposes
         { text: GC.PEG_PDF_STATS_TEXT + this.totalPercent + ' %', bold: true},
 
       ],
       styles: GC.PDF_STYLE
     };
 
     pdfMake.createPdf(documentDefinition).open();
   }

}
