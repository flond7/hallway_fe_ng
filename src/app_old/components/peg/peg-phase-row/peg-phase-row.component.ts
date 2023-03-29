import { Component, Input } from '@angular/core';
import { faCircle, faCircleHalfStroke, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-peg-phase-row',
  templateUrl: './peg-phase-row.component.html',
  styleUrls: ['./peg-phase-row.component.sass']
})
export class PegPhaseRowComponent {
  @Input() phases: any;
  @Input() i: any;
  
  faCircle =faCircle;
  faCircleHalfStroke = faCircleHalfStroke;
  faMinus =faMinus;

}
