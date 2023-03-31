import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as GB from '../../../../constants'



@Component({
  selector: 'app-peg-new-goal',
  templateUrl: './peg-new-goal.component.html',
  styleUrls: ['./peg-new-goal.component.sass']
})
export class PegNewGoalComponent {

@Input() phases: any;

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

constructor () {}

ngOnInit(): void {  
  console.log(this.gf);
  console.log(GB.globalConstants.GOAL_WEIGHT)
}

changeWeight(value: any) {
  console.log(this.gf)
  //this.weight = value;
}
submit() {
  console.log('submitted')
}

}
