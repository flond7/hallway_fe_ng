import { Component, Input, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { PegApiService } from '../../../services/peg-api.service';
import { PegPerson, PegGoal } from '../../../../interfaces';
import * as GC from '../../../../constants'
import { disableDebugTools } from '@angular/platform-browser';
// Modal imports
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-peg-new-goal',
  templateUrl: './peg-new-goal.component.html',
  styleUrls: ['./peg-new-goal.component.sass']
})
export class PegNewGoalComponent {

  //@Input() phases: any;
  /* @ViewChild('searchInput', { static: false }) searchInput: ElementRef; */

  // Modal
  modalRef?: BsModalRef;
  pegInstructions = GC.PEG_INSTRUCTIONS;

  userList: PegPerson[] = [];
  filteredPAUserList: PegPerson[] = [];
  involved: PegPerson[] = [];
  searching: boolean = false;


  // Resonsable select
  responsables: PegPerson[] = [];
  selectedResponsable: PegPerson = {
    id: 0,
    name: '',
    surname: '',
    jobCategory: '',
    responsable: true, 
    responsableOffice: [],
  };

  // Office select
  selectedOffices = [];
  constants = {main_office_choices: []}

  // goal
  goalList: PegGoal[] = [];
  emptyGoal: PegGoal = {
    id: 0,
    name: '',
    description: '',
    weight: 0,
    responsable: null,
    office: '',
    year: 0,
    involvedPeople: [],
    percent_3006: 0,
    weight_3006: 0,
    percent_3112: 0,
    weight_3112: 0,
  };

  // FA icons
  faPlus = faPlus;
  faMinus = faMinus;

  /* REACTIVE FORM */
  /* goalForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    type: new FormControl('Ordinario', [Validators.required]),
    start: new FormControl('', []),
    end: new FormControl('', []),
    office: new FormControl('', []),
    year: new FormControl('', []),
    people: new FormControl('', []),
    phases: new FormArray([]),
    markers: new FormArray([]),
  });
  markers!: FormArray;
  markerSingleGroup!: FormGroup;
  phases!: FormArray;
  phaseSingleGroup!: FormGroup;


  get gf() { return this.goalForm.controls; }
  get markerFormArray() { return this.goalForm.get("markers") as FormArray; }
  get phasesFormArray() { return this.goalForm.get("phases") as FormArray; } */

  constructor(public api: PegApiService, private bsModalService: BsModalService) { 
/*     // Initialize searchInput to null
    this.searchInput = new ElementRef(null); */
}

  ngOnInit(): void {
    this.api.getUserList().subscribe(res => {this.userList = res.data;})
    this.api.getPoList().subscribe(res => {this.responsables = res.data;})
    this.api.getConstants().subscribe(res => {this.constants = res;})
    this.addGoal()
  }

  changeOffice() { }

  changeResponsable() {
    this.selectedOffices = this.constants.main_office_choices.filter(office => this.selectedResponsable.responsableOffice.includes(office[0]));
    console.log(this.selectedOffices)
  }

  focus(){
    this.searching = true;
    this.filteredPAUserList = this.filteredPAUserList.filter(user => user.added !== true)
  }
  /* blur(){
    this.searching = false;
    this.filteredPAUserList = [];
  } */

  /* onSearchPAUser(event: any) {
    const query = event.target.value;
    //start with all the user then
    //filter out elements already added
    const usersNotAdded: PegPerson[]= this.userList.filter(user => !this.involved.some(addedUser => addedUser.id === user.id));
    this.filteredPAUserList = usersNotAdded.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.surname.toLowerCase().includes(query.toLowerCase()) &&
      (user.added !== true || user.added === undefined)
    );
    console.log(this.filteredPAUserList)
  } */





  addGoal(){
    this.goalList.push({...this.emptyGoal})         //use this form in order to create a new instance otherwise it would reference to the same space in memory
    console.log(this.goalList)
  }

  updateGoal(updatedGoal: PegGoal, i: number) {
    console.log(updatedGoal)
    this.goalList[i] = updatedGoal;
    console.log(this.goalList)
  }

  openInstructions(template: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(template)
  }

  submit() {
    
  }

  saveGoals() {
    //check sum of weight is 100
    let weightSum = 0;
    /* this.goalList.map(goal => {
      weightSum =+ goal.weight;
      console.log(weightSum)
    }) */
  }

}
