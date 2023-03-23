import { Component } from '@angular/core';

@Component({
  selector: 'app-peg-goal-view',
  templateUrl: './peg-goal-view.component.html',
  styleUrls: ['./peg-goal-view.component.sass']
})
export class PegGoalViewComponent {

obj = {
  name: "Predisposizione PIAO",
  boss: "Dott.ssa Patrizia Mascellino",
  type: "ordinario",
  weight: 1,
  start: "",
  end: "",
  office: "",
  year: "",
  people: ["Elisa Pessa", "Elisa Pessa", "Elisa Pessa"],
  phases: [
    {description: "Studio della composizione del Piano e stesura parte relativa al Piano Nazionale Anticorruzione", startPrevision: "01/01/2023", endPrevision:"01/01/2023", weight: "40", startReal:"", endReal:"", status:"fatto", onTime: true},
    {description: "Redazione parte relativa al Piano della Performance e piano della formazione", startPrevision: "13/02/2023", endPrevision:"20/03/2023", weight: "40", startReal:"", endReal:"", status:"fatto", onTime: true},
    {description: "Predisposizione atto finale e approvazione in Giunta. Successivi adempimenti.", startPrevision: "13/02/2023", endPrevision:"20/03/2023", weight: "40", startReal:"", endReal:"", status:"fatto", onTime: true},
  ]
}

progress = 0;

ngOnInit(): void {
  this.calculateProgress();
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


}
