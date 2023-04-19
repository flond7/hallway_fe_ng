import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { PegApiService } from '../../../services/peg-api.service';
import { PegPerson, PegIndicator } from '../../../../interfaces';
import * as GC from '../../../../constants'



@Component({
  selector: 'app-peg-new-goal',
  templateUrl: './peg-new-goal.component.html',
  styleUrls: ['./peg-new-goal.component.sass']
})
export class PegNewGoalComponent {

@Input() phases: any;

goalWeight: any;                    //needed to manage constants: {text: 'etichetta', value: 1-3}
goalType: any;                      //needed to manage constants: ['string', 'string']
offices: any;                       //office list to retrive with API
involved: Array<PegPerson> = [];
markers: Array<PegIndicator> = [];
userList: any;

// FA icons
faPlus = faPlus;
faMinus = faMinus;

/* REACTIVE FORM */
goalForm = new FormGroup({
  name: new FormControl('', [Validators.required]),
  description: new FormControl('', [Validators.required]),
  weight: new FormControl('',[Validators.required]),
  type: new FormControl('Ordinario',[Validators.required]),
  start: new FormControl('', []),
  end: new FormControl('', []),
  office: new FormControl('', []),
  year: new FormControl('', []),
  people: new FormControl('', []),
  phases: new FormControl('', []),
});


get gf(){return this.goalForm.controls;}

constructor (public api: PegApiService) {}

ngOnInit(): void {  
  this.goalWeight = GC.GOAL_WEIGHT;
  this.goalType = GC.GOAL_TYPE;
  this.api.getOfficeList().subscribe(res =>{this.offices = res})
  this.api.getUserList().subscribe(res => {this.userList = res})

}

setInitialFormValues(){
  this.gf.type.setValue(this.goalType[0]);
  this.gf.weight.setValue(this.goalWeight[0].text);
}

changeWeight(value: any) {
  this.gf.weight.setValue(value.text);
  console.log(this.gf.weight.value)
}

changeType(t:any){
  this.gf.type.setValue(t);
}

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

addMarker() {
  let newMarker = {
    name: "",
    valueStart: "",
    valueEnd: "",
  }
  this.markers.push(newMarker);

}

submit() {
  console.log('submitted')
}

}
