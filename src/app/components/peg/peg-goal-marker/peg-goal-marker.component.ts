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
  @Input() formGroupName: any;
  @Input() markerControl: any;
  @Input() markerControlIndex: any;
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

  emitMarkerArray(value: any) {
    this.markerArrayCompiled.emit(value);
  }

  generateMarkerGroupForm():FormGroup {
    this.markerSingleGroup =  new FormGroup ({
      markerName: new FormControl('',[]),
      markerExpectedValue: new FormControl('',[]),
      markerRealValue: new FormControl('',[]),
      markerDone: new FormControl(false),
    })
    return this.markerSingleGroup
  }
  
  confirmMarker(marker:any, i:any){
    console.log(marker.value);
    marker.controls.markerDone.setValue(true);
    // find all the keys for the marker group, then use the key to apply a disable() function
    // to disable controls in a reactive form friendly way you have to use formgroup.controls['name of the control'].disable
    let k = Object.keys(marker.controls);
    k.map(el => {marker.controls[el].disable()})
    this.emitMarkerArray(marker);
  }
  
  editMarker(marker:any, i:any) {
    marker.controls.markerDone.setValue(false);
  
    let k = Object.keys(marker.controls);
    k.map(el => {marker.controls[el].enable()})
  }
  
  deleteMarker(marker:any, i:any) {}

}
