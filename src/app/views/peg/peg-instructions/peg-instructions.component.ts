import { Component } from '@angular/core';
import * as GC from '../../../../constants';

@Component({
  selector: 'app-peg-instructions',
  templateUrl: './peg-instructions.component.html',
  styleUrls: ['./peg-instructions.component.sass']
})
export class PegInstructionsComponent {
  ordTitle = GC.PEG_GOAL_ORDINARY_TITLE;
  extraTitle = GC.PEG_GOAL_EXTRAORDINARY_TITLE;


}
