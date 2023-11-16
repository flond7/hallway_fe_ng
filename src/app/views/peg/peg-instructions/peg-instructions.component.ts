import { Component } from '@angular/core';
import { faUsers, faBullseye, faHome, faPlus, faPen, faTrash, faList, faFileExport, faChartSimple, faInfo } from '@fortawesome/free-solid-svg-icons';
import * as GC from '../../../../constants';

@Component({
  selector: 'app-peg-instructions',
  templateUrl: './peg-instructions.component.html',
  styleUrls: ['./peg-instructions.component.sass']
})
export class PegInstructionsComponent {

  ordTitle = GC.PEG_GOAL_ORDINARY_TITLE;
  extraTitle = GC.PEG_GOAL_EXTRAORDINARY_TITLE;

  faChartSimple = faChartSimple;
  faPen = faPen;
  faPlus = faPlus;
  faTrash = faTrash;
}
