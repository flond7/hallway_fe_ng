import { Component, Input } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
// Modal imports
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from '../../../services/modals.service'

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.sass']
})
export class DeleteModalComponent {

  /*
  To be reusable the modal works with a boolean variable confirm = false
  If the user conferms the value is changed to true and goes back to the parent component
  the parent checks the value and proceeds deleting the element.

  This way you can use the modal with multiple components without having to specify anything
  because the actual element to delete is never passed here

  */

  @Input() message: string = "";  // message to display on modal

  faTrash = faTrash; 

  constructor(private modalService: ModalService) {}


  deleteElement() {
    this.modalService.hideDeleteModal(true);
  }

  cancelModal() {
    this.modalService.cancelDeleteModal();
  }

}
