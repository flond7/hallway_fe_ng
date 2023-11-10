import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FeedbackModalComponent } from '../components/modals/feedback-modal/feedback-modal.component';
import { DeleteModalComponent } from '../components/modals/delete-modal/delete-modal.component';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalRef!: BsModalRef;
  private modalRefDelete!: BsModalRef;

  // Delete modal, output value
  private confirmSubject: Subject<boolean> = new Subject<boolean>();


  constructor(private modalService: BsModalService) {}

  openFeedbackModal(success:boolean, message:string) {
    const initialState = {
      success: success,
      message: message,
    }
    this.modalRef = this.modalService.show(FeedbackModalComponent, {initialState});
  }

  // DELETE MODAL
  
  openDeleteModal(message: string): Observable<boolean> {
    const initialState = {
      message: message,
    };
    this.modalRefDelete = this.modalService.show(DeleteModalComponent, { initialState });
    return this.confirmSubject.asObservable();
  }
  hideDeleteModal(confirm: boolean) {
    this.modalRefDelete.hide();
    this.confirmSubject.next(confirm);
  }
  cancelDeleteModal() {
    this.modalRefDelete.hide();
  }

  /* closeModal() {
    this.modalRef.hide();
  } */
}
