import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";



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
  weight: new FormControl('', [Validators.required]),
  start: new FormControl('', []),
  end: new FormControl('', []),
  office: new FormControl('', []),
  year: new FormControl('', []),
  people: new FormControl('', []),
  phases: new FormControl('', []),
});

get gf(){return this.goalForm.controls;}

submit() {
  console.log('submitted')
}

}
