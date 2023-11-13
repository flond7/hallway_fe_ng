import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartDataset, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PegApiService } from '../../../services/peg-api.service';
import { PegOffice } from 'src/interfaces';
import * as GC from '../../../../constants'

//needed to populate data for chart dinamically
interface officeData {ordinary: 0, extraordinary: 0, name: ''};

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

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
      },
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [];
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };
  showBarChart: boolean = false;  //needed because the cart doesn't render properly if the data are not already populated correctly


  
  officeGoals: officeData[] = [];

  //year
  year: number = 0;

  constructor(private api: PegApiService) {
      const currentDate = new Date();
      this.year = currentDate.getFullYear();
      this.api.getGoalNumbers({year: this.year}).subscribe(r => {
        console.log(r);
        this.officeGoals = r
        this.populateChart();
      })
    }

  populateChart() {
    this.barChartData.labels = this.officeGoals.map(g => g.name);

    const newExtra = {
      data: this.officeGoals.map(g => g.extraordinary),
      backgroundColor: GC.COLOR_PRIMARY_PEG,
      label: GC.PEG_GOAL_EXTRAORDINARY_TITLE};
    this.barChartData.datasets.push(newExtra);

    const newOrd = {
      data: this.officeGoals.map(g => g.ordinary),
      backgroundColor: GC.COLOR_WHITE,
      label: GC.PEG_GOAL_ORDINARY_TITLE};
    this.barChartData.datasets.push(newOrd);

    this.showBarChart = true;
    console.log(this.barChartData)
  }

}
