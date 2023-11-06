import { Component } from '@angular/core';

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

  selectTab(tabSelected: string) {
    for (const key in this.tab) {
      if (key === tabSelected) {
        (this.tab as any)[key] = true;
      } else {
        (this.tab as any)[key] = false;
      }
    }
  }



}
