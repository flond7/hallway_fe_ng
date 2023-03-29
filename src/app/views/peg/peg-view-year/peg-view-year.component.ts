import { Component } from '@angular/core';

@Component({
  selector: 'app-peg-view-year',
  templateUrl: './peg-view-year.component.html',
  styleUrls: ['./peg-view-year.component.sass']
})
export class PegViewYearComponent {
  years = ['2023', '2022', '2021'];
  progress = 25; //// to delete
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
  };
  year_objs = [this.obj, this.obj, this.obj];



  ngOnInit(): void {      
    this.calculateProgress();
  }
  
  calculateProgress() {
    let doneGoals = this.obj.phases.length;
    let counter = this.obj.phases.length;
  
    this.obj.phases.map((elem: any) => {
      if (elem.status === "Da fare") {doneGoals -= 1};
    });
    this.progress = (doneGoals * 100 ) / counter
  }

}