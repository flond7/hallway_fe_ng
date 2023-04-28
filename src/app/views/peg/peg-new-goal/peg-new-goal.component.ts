import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { faPlus, faMinus, faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PegApiService } from '../../../services/peg-api.service';
import { PegPerson } from '../../../../interfaces';
import * as GC from '../../../../constants'
import { disableDebugTools } from '@angular/platform-browser';



@Component({
  selector: 'app-peg-new-goal',
  templateUrl: './peg-new-goal.component.html',
  styleUrls: ['./peg-new-goal.component.sass']
})
export class PegNewGoalComponent {

//@Input() phases: any;

goalWeight: any;                    //needed to manage constants: {text: 'etichetta', value: 1-3}
goalType: any;                      //needed to manage constants: ['string', 'string']
offices: any;                       //office list to retrive with API
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
  phases: new FormArray([]),
  markers: new FormArray([]),
});
markers!: FormArray;
markerSingleGroup!: FormGroup;
phases!: FormArray;
phaseSingleGroup!: FormGroup;


get gf()  { return this.goalForm.controls;}
get markerFormArray()  { return this.goalForm.get("markers") as FormArray; }
get phasesFormArray()  { return this.goalForm.get("phases") as FormArray; }

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


// GENERATE MARKERS AND ADD THEM TO GENERAL FORM
addMarker() {
  this.markers = this.goalForm.get("markers") as FormArray;
  this.markers.push(this.generateMarkerGroupForm())
}

generateMarkerGroupForm():FormGroup {
  this.markerSingleGroup =  new FormGroup ({
    markerName: new FormControl('',[]),
    markerExpectedValue: new FormControl('',[]),
    markerRealValue: new FormControl('',[]),
    markerDone: new FormControl(false),
  })
  return this.markerSingleGroup
}

confirmMarker(marker:any){
  marker.controls.markerDone.setValue(true);
  // find all the keys for the marker group, then use the key to apply a disable() function
  // to disable controls in a reactive form friendly way you have to use formgroup.controls['name of the control'].disable
  let k = Object.keys(marker.controls);
  k.map(el => {marker.controls[el].disable()})
}

editMarker(marker:any) {
  marker.controls.markerDone.setValue(false);

  let k = Object.keys(marker.controls);
  k.map(el => {marker.controls[el].enable()})
}

deleteMarker(i:any) {
  this.markers.removeAt(i);
}

// GENERATE PHASES AND ADD THEM TO GENERAL FORM
addPhase() {
  this.phases = this.goalForm.get("phases") as FormArray;
  this.phases.push(this.generatePhaseGroupForm())
}

generatePhaseGroupForm():FormGroup {
  this.phaseSingleGroup =  new FormGroup ({
    phaseName: new FormControl('',[]),
    phaseExpectedStart: new FormControl('',[]),
    phaseExpectedEnd: new FormControl('',[]),
    phaseRealStart: new FormControl('',[]),
    phaseRealEnd: new FormControl('',[]),
    phaseValue: new FormControl('',[]),
    phaseDone: new FormControl(false),
  })
  return this.phaseSingleGroup
}

confirmPhase(phase:any){
  phase.controls.phaseDone.setValue(true);

  // find all the keys for the marker group, then use the key to apply a disable() function
  // to disable controls in a reactive form friendly way you have to use formgroup.controls['name of the control'].disable
  let k = Object.keys(phase.controls);
  k.map(el => {phase.controls[el].disable()})
}
editPhase(phase:any) {
  phase.controls.phaseDone.setValue(false);

  let k = Object.keys(phase.controls);
  k.map(el => {phase.controls[el].enable()})
}

deletePhase(i:any) {
  this.phases.removeAt(i);
}



submit() {
  console.log(this.goalForm.value)
  console.log(this.markers)
}

}
