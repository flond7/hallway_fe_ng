import { Component, Input, OnInit } from '@angular/core';
import { PegPerson, PegGoal } from '../../../../interfaces';
import { faUser, faCheck, faXmark, faExclamation } from '@fortawesome/free-solid-svg-icons';
import * as GC from '../../../../constants'

@Component({
  selector: 'app-peg-goal-report',
  templateUrl: './peg-goal-report.component.html',
  styleUrls: ['./peg-goal-report.component.sass']
})
export class PegGoalReportComponent implements OnInit {
  @Input() typeInput: string = '';
  @Input() inputGoal: PegGoal = {
    id: 0,
    name: '',
    description: '',
    weight: 0,
    manager: null,
    office: {
      id: 0,
      name: ''
    },
    year: 0,
    involvedPeople: [],
    percent_3006: 0,
    weight_3006: 0,
    percent_3112: 0,
    weight_3112: 0,
    type: '',
  };
  
  // weight computation
  weight_midvalue = 0;

  // FA icons 
  faUser = faUser; faCheck= faCheck; faXmark = faXmark; faExclamation =faExclamation;

  constructor() {}

  ngOnInit() {
    this.computeWeights();
  }

  computeWeights() {
    this.weight_midvalue = this.inputGoal.weight / 2;
    this.inputGoal.weight_3006 = (this.inputGoal.percent_3006 / 100) * this.inputGoal.weight;
    this.inputGoal.weight_3112 = (this.inputGoal.percent_3112 / 100) * this.inputGoal.weight;
  }
}
