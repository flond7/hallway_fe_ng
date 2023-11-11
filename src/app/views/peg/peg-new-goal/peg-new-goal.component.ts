import { Component } from '@angular/core';
import { PegPerson, PegOffice, PegGoal } from 'src/interfaces';
import { PegApiService } from '../../../services/peg-api.service';
import * as GC from '../../../../constants';
// Modal imports
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from '../../../services/modals.service'


@Component({
  selector: 'app-peg-new-goal',
  templateUrl: './peg-new-goal.component.html',
  styleUrls: ['./peg-new-goal.component.sass']
})
export class PegNewGoalComponent {

  year: number = 0;

  // Office selection
  officeList$: PegOffice[] = [];
  selectedOffice: PegOffice = {
    id: 0,
    name: 'Seleziona un ufficio'
  };

  modalRefOffice!: BsModalRef;

  // tab control
  extraordinary: boolean = true;
  extraordinaryTitle: string = GC.PEG_GOAL_EXTRAORDINARY_TITLE;
  ordinaryTitle: string = GC.PEG_GOAL_ORDINARY_TITLE;

  // Css control
  primarypeg = GC.COLOR_PRIMARY_PEG;
  dark = GC.COLOR_DARK;
  white1 = GC.COLOR_WHITE_ONE;
  white2 = GC.COLOR_WHITE_TWO;
  white3 = GC.COLOR_WHITE_THREE;

  // Goal list
  goalList: PegGoal[] = [];

  // total calculation
  extraordinaryTotalWeight: number = 0;
  extraordinaryWeight3006: number = 0;
  extraordinaryWeight3112: number = 0;
  ordinaryTotalWeight: number = 0;
  ordinaryWeight3006: number = 0;
  ordinaryWeight3112: number = 0;

  constructor(private api: PegApiService, private modalService: ModalService, public bsModalService: BsModalService) {
    const currentDate = new Date();
    this.year = currentDate.getFullYear();

    api.officeListData$.subscribe(r => {
      this.officeList$ = r;
    })
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

}
