import { Component, Input, TemplateRef } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AccessoAttiApiService } from '../../../services/accessoAtti-api.service';
import { ModalService } from '../../../services/modals.service';
// Modal imports
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-aa-list-row',
  templateUrl: './aa-list-row.component.html',
  styleUrls: ['./aa-list-row.component.sass']
})
export class AaListRowComponent {
  @Input() access: any;

  faPen = faPen;
  faTrash = faTrash;

  deleteId: number = 0;   //to store the id of the item to be deleted

  modalRef?: BsModalRef;

  constructor(public api: AccessoAttiApiService, private bsModalService: BsModalService, public modalService: ModalService) { }

  toogle() {
    console.log('toogle')
  }

  openModal(i: number, template: TemplateRef<any>) {
    this.deleteId = i;
    this.modalRef = this.bsModalService.show(template)
  }

  deleteAccess() {
    this.api.deleteAccess(this.deleteId).subscribe(r => {
      // close the open modal
      console.log(r);
      this.modalRef?.hide();
        if (r.status == 201) {
          // open the feedback one passing if it's a success and the message from the BE
          this.modalService.openFeedbackModal(true, r.data)
        } else {
          this.modalService.openFeedbackModal(false, r.data)
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  

}
