import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { PegGoal } from 'src/interfaces';
import { PegApiService } from '../../../services/peg-api.service';
import * as GC from '../../../../constants';

import { ChartConfiguration, ChartOptions, ChartDataset, ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-peg-user-card',
  templateUrl: './peg-user-card.component.html',
  styleUrls: ['./peg-user-card.component.sass']
})
export class PegUserCardComponent implements OnInit {
  @Input() year: number = 0;
  @Input() idUser: string = '';
  @Input() bgcolor: string = '';
  @Input() textcolor: string = '';

  userId: number = 0; //used to cast the key arriving as a string into a number

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

  // strings and messages
  extraordinaryTitle: string = GC.PEG_GOAL_EXTRAORDINARY_TITLE;
  ordinaryTitle: string = GC.PEG_GOAL_ORDINARY_TITLE;
  primaryPeg = GC.COLOR_PRIMARY_PEG;

  // chart
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      x: {
      },
      y: {
        min: 0,
        max: 100,
      },
    },
  };

  public barChartLabels = ['Ordinary', 'Extraordinary'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;

  public barChartData = [
    { data: [75, 25], label: 'Percentage', backgroundColor: ['#ffffff', '#ffffff' ] }
  ];

  showBarChart: boolean = false;  //needed because the cart doesn't render properly if the data are not already populated correctly




  constructor(private api: PegApiService) { }

  ngOnInit() {
    //cast userId input in number
    this.userId = Number(this.idUser);

    //get report to access
    let data = { year: this.year, id: this.idUser }
    this.api.getMinPersonReport(data).subscribe(r => {
      this.miniPersonReport = r.data;
      this.barChartData = [{ data: [this.miniPersonReport.percent_ordinary, this.miniPersonReport.percent_extraordinary], label: 'perc', backgroundColor: ['#ffffff', this.primaryPeg] }];
    })
  }

}
