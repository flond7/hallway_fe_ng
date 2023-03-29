import { Component } from '@angular/core';

@Component({
  selector: 'app-peg-goal-view',
  templateUrl: './peg-goal-view.component.html',
  styleUrls: ['./peg-goal-view.component.sass']
})
export class PegGoalViewComponent {

progress = 0;
todayDate : Date = new Date();

obj = {
  name: "Predisposizione PIAO",
  description: "",
  boss: "Dott.ssa Patrizia Mascellino",
  type: "ordinario",
  weight: 1,
  start: "",
  end: "",
  office: "Segreteria generale",
  year: "",
  people: ["Patrizia Mascellino", "Stefania Fabbro", "Federica Gobbo"],
  phases: [
    {description: "Studio della composizione del Piano e stesura parte relativa al Piano Nazionale Anticorruzione", startPrevision: "01/01/2023", endPrevision:"01/01/2023", weight: "40", startReal:this.todayDate, endReal:this.todayDate, status:"", onTime: true},
    {description: "Redazione parte relativa al Piano della Performance e piano della formazione", startPrevision: this.todayDate, endPrevision:this.todayDate, weight: "40", startReal: this.todayDate, endReal:this.todayDate, status:"", onTime: true},
    {description: "Predisposizione atto finale e approvazione in Giunta. Successivi adempimenti.", startPrevision: this.todayDate, endPrevision:this.todayDate, weight: "20", startReal:this.todayDate, endReal:null, status:"", onTime: true},
  ]
}

ngOnInit(): void {  
  this.obj.phases.map((phase:any) => {
    this.onTime(phase);
  });
  
  this.calculateProgress();
}

calculateProgress() {
  //let doneGoals = 0;
  let doneGoals = this.obj.phases.length;
  let counter = this.obj.phases.length;

  this.obj.phases.map((elem: any) => {
    if (elem.status === "Da fare") {doneGoals -= 1};
    console.log(counter);
    console.log(doneGoals);
  });
  /* let counter = 0;
  this.obj.phases.map((elem: any) => {
    counter += 1;
    if (elem.status === "fatto") {doneGoals += 1};
  }); */
  this.progress = (doneGoals * 100 ) / counter
}

onTime(phase: any) {
  if (phase.endReal === null) {
    phase.status = "Da fare"
  } else if (phase.endReal > phase.endPrevision) {
    phase.status = "In ritardo";
  } else if (phase.endReal < phase.endPrevision ) {
    phase.status = "In anticipo";
  } else if (phase.endReal = phase.endPrevision) {
    phase.status = "In tempo";
  }
}


}
