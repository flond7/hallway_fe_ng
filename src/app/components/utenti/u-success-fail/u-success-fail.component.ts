import { Component, Input } from '@angular/core';
import { faCircle, faCircleHalfStroke, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-u-success-fail',
  templateUrl: './u-success-fail.component.html',
  styleUrls: ['./u-success-fail.component.sass']
})
export class USuccessFailComponent {
  @Input() success: any;
  
  faCircle =faCircle;
  faCircleHalfStroke = faCircleHalfStroke;
  faMinus =faMinus;


}
