import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { faPlus, faMinus, faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AccessoAttiApiService } from '../../../services/accessoAtti-api.service';
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

constructor (public api: AccessoAttiApiService) {}

ngOnInit(): void {  
  this.goalWeight = GC.GOAL_WEIGHT;
  this.goalType = GC.GOAL_TYPE;
  this.applicants = GC.AA_APPLICANT_TYPE;
  this.types = GC.AA_TYPES;
  this.results = GC.AA_RESULT;
}

/* changeType(t:any){
  this.gf.accesstype.setValue(t);
} */

addInvolvedPeople(person:PegPerson){
  person.added = true;
  this.involved.push(person);
  console.log(this.involved)
}
removeInvolvedPeople(person:PegPerson){
  person.added = false;
  this.involved.forEach((el,index)=>{
    if(el==person) this.involved.splice(index,1);
  });
}

/* correctFormatForDates(dataToFormat:any) {
  if (dataToFormat) {
    let newDate = dataToFormat.toISOString().split('T')[0];
    return newDate;
  }
}

 */

submit() {
  //console.log(this.accessForm.value)
  //format correctly in ISO the dates
  //this.accessForm.value.requestDate = this.correctFormatForDates(this.accessForm.value.requestDate)

  this.api.createAccess(this.accessForm.value).subscribe(r => console.log(r))
}

}
