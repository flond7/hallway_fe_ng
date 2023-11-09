import { Component } from '@angular/core';
import { PegApiService } from '../../../services/peg-api.service';
import { PegPerson, PegGoal, PegOffice } from 'src/interfaces';
import * as GC from '../../../../constants'

@Component({
  selector: 'app-peg-edit',
  templateUrl: './peg-edit.component.html',
  styleUrls: ['./peg-edit.component.sass']
})
export class PegEditComponent {
  // initial tab values
  tab = {
    reportOffice: true,       // only office searchbar is needed so we use the same search component passing the only value needed 
  }

  selectedOffice: PegOffice = {
    id: 0,
    name: ''
  }

  // goal list
  goalList: PegGoal[] = [];     //used to receive data from the search bar

  // tab control
  extraordinary: boolean = true;
  extraordinaryTitle: string = GC.PEG_GOAL_EXTRAORDINARY_TITLE;
  ordinaryTitle: string = GC.PEG_GOAL_ORDINARY_TITLE;

}
