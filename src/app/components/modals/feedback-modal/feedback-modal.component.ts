import { Component, Input } from '@angular/core';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.sass']
})
export class FeedbackModalComponent {
  @Input() success: boolean = false;
  @Input() message: string = "";

  faCheck = faCheck;
  faX = faX;


}
