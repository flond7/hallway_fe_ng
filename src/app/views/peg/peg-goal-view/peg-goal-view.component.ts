import { Component } from '@angular/core';

@Component({
  selector: 'app-peg-goal-view',
  templateUrl: './peg-goal-view.component.html',
  styleUrls: ['./peg-goal-view.component.sass']
})
export class PegGoalViewComponent {

obj = {
  type: "ordinario",
  start: "",
  end: "",
  office: "",
  year: "",
  people: ["Elisa Pessa", "Elisa Pessa", "Elisa Pessa"],
  phases: [
    {description: "description 1", weight: "50", status:"fatto"},
    {description: "description 2", weight: "30", status:"fatto"},
    {description: "description 3", weight: "20", status: "in corso"},
    {description: "description 2", weight: "30", status:"da fare"},
  ]
}


}
