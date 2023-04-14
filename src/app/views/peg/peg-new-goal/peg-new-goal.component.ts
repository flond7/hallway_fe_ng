import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { PegApiService } from '../../../services/peg-api.service';
import * as GC from '../../../../constants'



@Component({
  selector: 'app-peg-new-goal',
  templateUrl: './peg-new-goal.component.html',
  styleUrls: ['./peg-new-goal.component.sass']
})
export class PegNewGoalComponent {

@Input() phases: any;

goalWeight: any;
offices: any;     //office list to retrive with API
involved: any;
userList: any;

// FA icons
faPlus = faPlus;


/* REACTIVE FORM */
goalForm = new FormGroup({
  name: new FormControl('', [Validators.required]),
  description: new FormControl('', [Validators.required]),
  weight: new FormControl([Validators.required]),
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
  this.api.getOfficeList().subscribe(res =>{this.offices = res})
  this.api.getUserList().subscribe(res => {this.userList = res})
  
}

changeWeight(value: any) {
  console.log(this.gf)
}

addInvolvedPeople(person:any){
  this.involved.add(person)
}

submit() {
  console.log('submitted')
}

}
