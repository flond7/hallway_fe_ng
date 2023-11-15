import { Component, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PegPerson, PegOffice, PegGoal, PegPoOffice } from 'src/interfaces';
import { PegApiService } from '../../../services/peg-api.service';
import { ChartConfiguration } from 'chart.js';
import * as GC from '../../../../constants';
import { faFilePdf, faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons';

// pdf imports
import html2canvas from 'html2canvas';
import jsPDF, * as jspdf from 'jspdf';
import autoTable from 'jspdf-autotable'
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// Modal imports
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from '../../../services/modals.service'

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

enum PageOrientation {
  Portrait = 'portrait',
  Landscape = 'landscape',
}

@Component({
  selector: 'app-peg-report-office',
  templateUrl: './peg-report-office.component.html',
  styleUrls: ['./peg-report-office.component.sass']
})

export class PegReportOfficeComponent {
  // initial vars
  year: number = 0;
  // Office selection and manager selection
  officeList$: PegPoOffice[] = [];
  selectedOffice: PegOffice = {
    id: 0,
    name: 'Seleziona un ufficio'
  };
  selectedManager: PegPerson = {
    id: 0,
    name: '',
    surname: '',
    jobCategory: '',
    manager: false,
    managerOfOffices: []
  }

  modalRefOffice!: BsModalRef;

  // tab control
  extraordinary: boolean = true;
  extraordinaryTitle: string = GC.PEG_GOAL_EXTRAORDINARY_TITLE;
  ordinaryTitle: string = GC.PEG_GOAL_ORDINARY_TITLE;

  // Css control
  primarypeg = GC.COLOR_PRIMARY_PEG;
  dark = GC.COLOR_DARK;
  white = GC.COLOR_WHITE;
  white1 = GC.COLOR_WHITE_ONE;
  white2 = GC.COLOR_WHITE_TWO;
  white3 = GC.COLOR_WHITE_THREE;

  // Goal list
  goalList: PegGoal[] = [];                     //goal list is the concat of the extra and ordinary goal lists
  extraordinaryGoalList: PegGoal[] = [];
  ordinaryGoalList: PegGoal[] = [];

  // total calculation
  extraordinaryTotals: number[] = [];   //these arrays contain the result of getTotals(), weight, weight3006, weight3112, so you can access them as xxxxTotal[0], [1] or [2] in the template
  ordinaryTotals: number[] = [];

  // widgets vars
  showWidgets: boolean = false;
  ordNumber: number = 0;
  extraNumber: number = 0;
  people: number = 0;

  // FA icons
  faFloppyDisk = faFloppyDisk; faPlus = faPlus; faFilePdf = faFilePdf;

  // Doughnut charts options
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = { responsive: true, transitions: {} };
  public totalChartData: ChartConfiguration<'doughnut'>['data']['datasets'] = [      // data: [success , failure], label: 'Series A', backgroundColor: ['#success', '#failure'],
    { data: [0, 0], backgroundColor: ['#8bc34a', '#505154'], borderWidth: 0 }
  ];
  // graph vars
  totalWeight: number = 0;
  totalWeight_3112: number = 0;
  totalPercent: number = 0;
  showChart: boolean = false;

  //PDF
  pdfTitle: string = "";
  pdfWidths = ['auto'];
  arrayOfKeys = GC.PEG_PDF_ACCESS_KEYS;
  pdfBodyOrdinary = [GC.PEG_PDF_ACCESS_KEYS];
  pdfBodyExtraordinary = [GC.PEG_PDF_ACCESS_KEYS];  //needed so the first row are the headers// pdf vars

  constructor(private api: PegApiService, private modalService: ModalService, public bsModalService: BsModalService, private router: Router, private route: ActivatedRoute) {
    const currentDate = new Date();
    this.year = currentDate.getFullYear();

    api.officeAndPoListData$.subscribe(r => {
      this.officeList$ = r;
      console.log(r)
    })

  }

  openModal(modal: TemplateRef<any>) {
    this.modalRefOffice = this.bsModalService.show(modal);
  }

  selectOffice(office: PegOffice) {
    //delete the chart from the page to re-render it after getting new data
    this.showChart = false;
    this.selectedOffice = office;
    const data = { year: this.year, id: this.selectedOffice.id }
    this.api.getReportOffice(data).subscribe(r => {
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

    //create an object with the id as key and the number of times it is included in goals as value (keep it in case it's needed after for some more stats), 
    //then iterate trought each goal and add a counter for that person
    const countMap: { [key: number]: number } = {};
    this.goalList.forEach(item => {
      item.involvedPeople.forEach(id => {
        countMap[id] = (countMap[id] || 0) + 1;
      });
    });
    //transform the object in an array and get the length
    this.people = Object.keys(countMap).length;
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
    this.totalWeight = this.goalList.reduce((sum, goal) => sum + goal.weight, 0);
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

  generatePdf() {
    this.createPdfTable();

    // Get the chart element
    const chartElement = document.getElementById('doughnutChart');

    if (chartElement) {
      html2canvas(chartElement).then(canvas => {
        //if there is a canvas
        const chartImage = canvas.toDataURL('image/png');
        //const pdf = new jspdf.jsPDF();

        const documentDefinition = {
          pageOrientation: PageOrientation.Landscape,
          content: [
            { text: this.year, style: 'year' },
            { text: this.selectedOffice.name, style: 'name' },
            { text: ' ' }, //empty line for aesthetic purposes
            { text: GC.PEG_GOAL_EXTRAORDINARY_TITLE, style: 'h2' },
            {
              columns: [
                [
                  {
                    table: {
                      headerRows: 1,
                      body: this.pdfBodyExtraordinary,
                      widths: [220, 100, 30, 60, 50],
                    },
                    layout: 'lightHorizontalLines',
                    width: '60%',
                  },
                  { text: ' ' }, //empty line for aesthetic purposes
                  { text: GC.PEG_GOAL_ORDINARY_TITLE, style: 'h2' },
                  { text: ' ' }, //empty line for aesthetic purposes
                  {
                    table: {
                      headerRows: 1,
                      body: this.pdfBodyOrdinary,
                      widths: [220, 100, 30, 60, 50],
                    },
                    layout: 'lightHorizontalLines',
                    width: '60%',
                  },
                  { text: ' ' }, //empty line for aesthetic purposes
                  { text: 'Personale coinvolto: '+this.people+' persone', style:'h2'},
                ],
                [
                  { image: chartImage, width: 250 },
                  { text: ' ' }, //empty line for aesthetic purposes
                  { text: 'Realizzazione: ' + this.totalPercent.toFixed(2) + '%', style: 'h1' },
                ]
              ]
            },
          ],
          styles: GC.PDF_STYLE
        }


        pdfMake.createPdf(documentDefinition).open();
      })
    }
  }

  createPdfTable() {
    this.ordinaryGoalList.map(goal => {
      const pdfGoal = [goal.name, goal.office.name, goal.weight.toString(), goal.percent_3112.toString()]
      this.pdfBodyOrdinary.push(pdfGoal)
    })

    this.extraordinaryGoalList.map(goal => {
      const pdfGoal = [goal.name, goal.office.name, goal.weight.toString(), goal.percent_3112.toString()]
      this.pdfBodyExtraordinary.push(pdfGoal)
    })
  }

}
