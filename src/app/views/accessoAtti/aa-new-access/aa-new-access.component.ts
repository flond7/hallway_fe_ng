import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { faPlus, faMinus, faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AccessoAttiApiService } from '../../../services/accessoAtti-api.service';
import { ModalService } from '../../../services/modals.service';
import { PegPerson } from '../../../../interfaces';
import * as GC from '../../../../constants'
import { disableDebugTools } from '@angular/platform-browser';



@Component({
  selector: 'app-aa-new-access',
  templateUrl: './aa-new-access.component.html',
  styleUrls: ['./aa-new-access.component.sass']
})
export class AaNewAccessComponent {

//@Input() phases: any;

goalWeight: any;                    //needed to manage constants: {text: 'etichetta', value: 1-3}
goalType: any;                      //needed to manage constants: ['string', 'string']
applicants: any;                    //applicants list to retrive from constants
types: any;                    //applicants list to retrive from constants
results: any;                       //results to retrieve from constants
involved: Array<PegPerson> = [];
//markers: Array<PegIndicator> = [];
userList: any;

// FA icons
faPlus = faPlus;
faMinus = faMinus;
faCheck = faCheck;
faPen = faPen;
faTrash = faTrash;

/* REACTIVE FORM */
accessForm = new FormGroup({
  accessType: new FormControl(GC.AA_TYPES[0],[Validators.required]),
  requestProtocol: new FormControl('',[Validators.required]),
  requestDate: new FormControl('',[Validators.required]),
  requestApplicant: new FormControl(GC.AA_APPLICANT_TYPE[0],[Validators.required]),
  topic: new FormControl('',[Validators.required]),
  others: new FormControl('',[Validators.required]),
  responsable: new FormControl('',[Validators.required]),
  answerResult: new FormControl(GC.AA_RESULT[0],[Validators.required]),
  answerProtocol: new FormControl('',[Validators.required]),
  answerDate: new FormControl('',[Validators.required]),
  answerNote: new FormControl('',[Validators.required]),
});



get gf()  { return this.accessForm.controls;}

constructor (public api: AccessoAttiApiService, public modalService: ModalService) {}

ngOnInit(): void {  
  this.applicants = GC.AA_APPLICANT_TYPE;
  this.types = GC.AA_TYPES;
  this.results = GC.AA_RESULT;
}



submit() {
  this.api.createAccess(this.accessForm.value).subscribe(r => {
    if (r.status == 200) {
      //pass if it's a success and the message from the BE
      this.modalService.openFeedbackModal(true, r.data)
    } else {
      //pass if it's a success and the message from the BE
      this.modalService.openFeedbackModal(false, r.data)
    }
  })
}

}
