import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-peg-goal-phase',
  templateUrl: './peg-goal-phase.component.html',
  styleUrls: ['./peg-goal-phase.component.sass']
})
export class PegGoalPhaseComponent {
  @Input() phases: any;
  @Input() i: any;
}
