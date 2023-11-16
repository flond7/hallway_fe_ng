import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartDataset, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PegApiService } from '../../../services/peg-api.service';
import { PegOffice } from 'src/interfaces';
import * as GC from '../../../../constants'

//needed to populate data for chart dinamically
interface officeData { ordinary: 0, extraordinary: 0, name: '', sum_weights: 0, sum_weights3112: 0, people_involved: [] };

@Component({
  selector: 'app-peg-home',
  templateUrl: './peg-home.component.html',
  styleUrls: ['./peg-home.component.sass']
})
export class PegHomeComponent {

  //year
  year: number = 0;

  // string and messages
  namePA: string = GC.NAME_PA;
  ordTitle = GC.PEG_GOAL_ORDINARY_TITLE;
  extraTitle = GC.PEG_GOAL_EXTRAORDINARY_TITLE;
  primarypeg = GC.COLOR_PRIMARY_PEG;
  dark = GC.COLOR_DARK;
  white = GC.COLOR_WHITE;
  white1 = GC.COLOR_WHITE_ONE;
  white2 = GC.COLOR_WHITE_TWO;

  // bar chart
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

  //goals
  officeGoals: officeData[] = [];

  // widgets
  ordSum: number = 0;
  extraSum: number = 0;
  percent: number = 0;
  people: number = 0;
  involvedPeople = [];
  avgGoal: number = 0;

  constructor(private api: PegApiService) {
    const currentDate = new Date();
    this.year = currentDate.getFullYear();
    this.api.getGoalNumbers({ year: this.year }).subscribe(r => {
      console.log(r);
      this.officeGoals = r.data
      this.involvedPeople = r.people_involved;
      this.populateChart();
      this.getWidgetData();
    })
  }

  populateChart() {
    this.barChartData.labels = this.officeGoals.map(g => g.name);

    const newExtra = {
      data: this.officeGoals.map(g => g.extraordinary),
      backgroundColor: GC.COLOR_PRIMARY_PEG,
      label: GC.PEG_GOAL_EXTRAORDINARY_TITLE
    };
    this.barChartData.datasets.push(newExtra);

    const newOrd = {
      data: this.officeGoals.map(g => g.ordinary),
      backgroundColor: GC.COLOR_WHITE,
      label: GC.PEG_GOAL_ORDINARY_TITLE
    };
    this.barChartData.datasets.push(newOrd);

    this.showBarChart = true;
    console.log(this.barChartData)
  }

  getWidgetData() {
    this.ordSum = this.officeGoals.reduce((total, item) => total + item.ordinary, 0);
    this.extraSum = this.officeGoals.reduce((total, item) => total + item.extraordinary, 0);

    //calculate percentage for the whole PA
    let sum_weights = this.officeGoals.reduce((total, item) => total + item.sum_weights, 0);
    let sum_weights3112 = this.officeGoals.reduce((total, item) => total + item.sum_weights3112, 0);
    this.percent = (sum_weights3112 * 100) / sum_weights;

    //calculate people involved

    //calculate average number of goals for person
    const values = Object.values(this.involvedPeople)
    let goalSum = values.reduce((total, value) => total + value, 0);
    this.avgGoal = goalSum / values.length;     //length works on array only
   
  }

}
