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
    {description: "Predisposizione atto finale e approvazione in Giunta. Successivi adempimenti.", startPrevision: this.todayDate, endPrevision:this.todayDate, weight: "40", startReal:this.todayDate, endReal:this.todayDate, status:"", onTime: true},
  ]
}

ngOnInit(): void {  
  this.calculateProgress();
  this.obj.phases.map((phase:any) => {
    this.onTime(phase);
  });
}

calculateProgress() {
  let doneGoals = 0;
  let counter = 0;
  this.obj.phases.map((elem: any) => {
    counter += 1;
    if (elem.status === "fatto") {doneGoals += 1};
  });
  this.progress = (doneGoals * 100 ) / counter
}

onTime(phase: any) {
  //to test
  phase.endReal = phase.startReal = phase.startPrevision = phase.endPrevision = this.todayDate;
  if (phase.endReal > phase.endPrevision) {
    console.log("ok")
    phase.status = "In ritardo";
  } else if (phase.endReal < phase.endPrevision) {
    phase.status = "In anticipo";
  } else if (phase.endReal = phase.endPrevision) {
    phase.status = "In tempo";
  } else {
    phase.status = "Da fare"
  }


}


}
