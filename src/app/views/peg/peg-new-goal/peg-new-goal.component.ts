import { Component } from '@angular/core';
import { PegPerson, PegOffice } from 'src/interfaces';
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

  //Office selection
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

  constructor(private api: PegApiService, private modalService: ModalService, public bsModalService: BsModalService) {
    const currentDate = new Date();
    this.year = currentDate.getFullYear();

    api.officeListData$.subscribe(r => {
      this.officeList$ = r;
    })
  }

}
