import { Component, TemplateRef } from '@angular/core';
import { PegPerson, PegGoal } from 'src/interfaces';
import { PegApiService } from '../../../services/peg-api.service';
import { faFilePdf, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ChartConfiguration } from 'chart.js';
import * as GC from '../../../../constants';

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
     this.pdfTitle = this.selectedUser.name + " - anno: " + this.year;
     // Get the chart element
    const chartElement = document.getElementById('doughnutChart');

    if (chartElement) {
      html2canvas(chartElement).then(canvas => {
        //if there is a canvas
        const chartImage = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF();
   
       const documentDefinition = {
       pageOrientation: PageOrientation.Portrait,
       content: [
         { text: this.pdfTitle, style: 'header' },
         { image: chartImage},
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
    })
  }
   }
  /* generatePdf() {
    //create the table for the pdf
    this.createPdfTable()

    // Get the chart element
    const chartElement = document.getElementById('doughnutChart');

    if (chartElement) {
      html2canvas(chartElement).then(canvas => {
        // Create a new jsPDF instance
        const pdf = new jspdf.jsPDF();

        // Calculate the width and height of the PDF based on the chart size
        //const pdfWidth = pdf.internal.pageSize.getWidth();
        //const pdfHeight = pdf.internal.pageSize.getHeight();
        const chartImage = canvas.toDataURL('image/png');

        // Add the chart image to the PDF
        pdf.addImage(chartImage, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);

        // Save or open the PDF
        pdf.save('chart.pdf');
      });
    }
  } */


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

  onGeneratePdfClick() {
    const chartElement = document.getElementById('your-chart-id');
  
    if (chartElement) {
      html2canvas(chartElement).then(chartCanvas => {
        // Create the PDF content
        const pdfContent = {
          header: 'Your PDF Header',
          content: [
            // Col-8 section with a table
            {
              columns: [
                { text: 'Col-8 Section with a Table', width: '60%' },
                {
                  table: {
                    headerRows: 1,
                    widths: ['*', '*'], // Adjust column widths as needed
                    body: [
                      ['Header 1', 'Header 2'],
                      ['Row 1, Cell 1', 'Row 1, Cell 2'],
                      ['Row 2, Cell 1', 'Row 2, Cell 2'],
                    ],
                  },
                  width: '40%',
                },
              ],
            },
            // Col-4 section with the chart
            {
              columns: [
                { text: 'Col-4 Section with a Chart', width: '60%' },
                //{ image: chartCanvas.toDataURL(), width: 200, height: 150, alignment: 'center' },
              ],
            },
          ],
        };
  
        // Generate the PDF
        pdfMake.createPdf(pdfContent).open();
      });
    }
  }
  
 /* 
  onGeneratePdfClick() {
    const chartElement = document.getElementById('your-chart-id');
  
    if (chartElement) {
      html2canvas(chartElement).then(chartCanvas => {
        const pdf = new jsPDF();
  
        // Add header
        pdf.text('Your PDF Header', 20, 20);
  
        // Col-8 section with a table
        pdf.text('Col-8 Section with a Table', 20, 40);
        const tableData = [['Header 1', 'Header 2'], ['Row 1, Cell 1', 'Row 1, Cell 2'], ['Row 2, Cell 1', 'Row 2, Cell 2']];
        pdf.autoTable({ head: tableData.slice(0, 1), body: tableData.slice(1) }, 20, 50);
  
        // Col-4 section with the chart
        pdf.text('Col-4 Section with a Chart', 20, 150);
        const chartImage = chartCanvas.toDataURL('image/png');
        pdf.addImage(chartImage, 'PNG', 20, 160, 100, 75);
  
        // Save or open the PDF
        pdf.save('your-pdf-file.pdf');
      });
    }
  }
 */
 /*  onGeneratePdfClick() {
    const chartElement = document.getElementById('your-chart-id');
    if (chartElement) {
      html2canvas(chartElement).then(chartCanvas => {
        // Capture the chart as an image

        // Create the PDF content
        const pdfContent = {
          header: 'Your PDF Header',
          content: [
            // Col-8 section with a table
            {
              columns: [
                { text: 'Col-8 Section with a Table', width: '60%' },
                { table: {
                    headers: ['Header 1', 'Header 2'],
                    rows: [
                      ['Row 1, Cell 1', 'Row 1, Cell 2'],
                      ['Row 2, Cell 1', 'Row 2, Cell 2'],
                    ],
                  },
                  width: '40%',
                },
              ],
            },
            // Col-4 section with the chart
            { columns: [
                { text: 'Col-4 Section with a Chart', width: '60%' },
                { image: chartCanvas.toDataURL(), width: 200, height: 150, alignment: 'center' },
              ],
            },
          ],
          pageMargins: [40, 60, 40, 60], // Adjust margins as needed
        };

        // Generate the PDF
        pdfMake.createPdf(pdfContent).open();
      });
    }
  } */
}


