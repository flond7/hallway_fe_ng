import { Component } from '@angular/core';
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
