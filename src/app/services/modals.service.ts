import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FeedbackModalComponent } from '../components/modals/feedback-modal/feedback-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalRef!: BsModalRef;

  constructor(private modalService: BsModalService) {}

  openFeedbackModal(success:boolean, message:string) {
    const initialState = {
      success: success,
      message: message,
    }
    this.modalRef = this.modalService.show(FeedbackModalComponent, {initialState});
  }

  closeModal() {
    this.modalRef.hide();
  }
}
