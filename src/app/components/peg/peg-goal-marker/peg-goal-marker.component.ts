import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-peg-goal-marker',
  templateUrl: './peg-goal-marker.component.html',
  styleUrls: ['./peg-goal-marker.component.sass']
})
export class PegGoalMarkerComponent {

  @Input() markerArray: any;
  @Output() markerArrayCompiled = new EventEmitter<any>();

  // FA icons
  faCheck = faCheck;
  faPen = faPen;
  faTrash = faTrash;

  //
  fakeGroup!: FormGroup
  markers!: FormArray;
  markerSingleGroup!: FormGroup;
  phases!: FormArray;

  aemitMarkerArray(value: any) {
    this.markerArrayCompiled.emit(value);
  }

  generateMarkerGroupForm():FormGroup {
    this.markerSingleGroup =  new FormGroup ({
      phaseName: new FormControl('',[]),
      phaseExpectedStart: new FormControl('',[]),
      phaseExpectedEnd: new FormControl('',[]),
      phaseRealStart: new FormControl('',[]),
      phaseRealEnd: new FormControl('',[]),
      phaseValue: new FormControl('',[]),
      phaseDone: new FormControl(false),
    })
    return this.markerSingleGroup
  }
  
  confirmMarker(marker:any, i:any){
    console.log(marker.value);
    marker.controls.phaseDone.setValue(true);
  }
  editMarker(marker:any, i:any) {
    marker.controls.phaseDone.setValue(false);
  }
  deleteMarker(marker:any, i:any) {
  
  }
}
