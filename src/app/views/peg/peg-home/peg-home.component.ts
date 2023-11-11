import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { PegApiService } from '../../../services/peg-api.service';
import { PegOffice } from 'src/interfaces';
import * as GC from '../../../../constants'

@Component({
  selector: 'app-peg-home',
  templateUrl: './peg-home.component.html',
  styleUrls: ['./peg-home.component.sass']
})
export class PegHomeComponent {

  namePA: string = GC.NAME_PA;
  primarypeg = GC.COLOR_PRIMARY_PEG;
  dark = GC.COLOR_DARK;
  white = GC.COLOR_WHITE;

  public barChartOptions: ChartOptions = {responsive: true,};
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataset[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Ordinari', stack: 'a' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Straordinari', stack: 'a' }
  ];

  officeGoals: Array<{ name: string; ordinary: number, extraordinary: number }> = [];

  //year
  year: number = 0;

  constructor(private api: PegApiService) {
      const currentDate = new Date();
      this.year = currentDate.getFullYear();
      this.api.getGoalNumbers({year: this.year}).subscribe(r => {console.log(r);this.officeGoals = r})
      //api.officeListData$.subscribe(r => { this.officeList$ = r; console.log(this.officeList$) });
    }

}
