import { Component, Input, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { PegApiService } from '../../../services/peg-api.service';
import { PegPerson, PegGoal } from '../../../../interfaces';
import * as GC from '../../../../constants'
import { disableDebugTools } from '@angular/platform-browser';
// Modal imports
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from '../../../services/modals.service';



@Component({
  selector: 'app-peg-new-goal',
  templateUrl: './peg-new-goal.component.html',
  styleUrls: ['./peg-new-goal.component.sass']
})
export class PegNewGoalComponent {

  // Modal
  modalRef?: BsModalRef;
  pegInstructions = GC.PEG_INSTRUCTIONS;

  userList: PegPerson[] = [];
  filteredPAUserList: PegPerson[] = [];
  involved: PegPerson[] = [];
  searching: boolean = false;


  // Resonsable select
  managers: PegPerson[] = [];
  selectedManager: PegPerson = {
    id: 0,
    name: '',
    surname: '',
    jobCategory: '',
    manager: true,
    managerOffice: [],
  };

  // Office select
  filteredOffices = [];
  selectedOffice: string = '';            // this is the o1, o2, o3... value for the office
  constants = { main_office_choices: [] }

  // goal
  goalList: PegGoal[] = [];
  emptyGoal: PegGoal = {
    id: 0,
    name: '',
    description: '',
    weight: 0,
    manager: null,
    office: '',
    year: 0,
    involvedPeople: [],
    percent_3006: 0,
    weight_3006: 0,
    percent_3112: 0,
    weight_3112: 0,
  };
  year: number = 0;

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

  constructor(public api: PegApiService, private bsModalService: BsModalService, public modalService: ModalService) { }

  ngOnInit(): void {
    //get user list, po list and constant list
    this.api.getUserList().subscribe(res => { this.userList = res.data; })
    this.api.getPoList().subscribe(res => { this.managers = res.data; })
    this.api.getConstants().subscribe(res => { this.constants = res; })
    //calculate the current year to show it as default value
    const currentDate = new Date();
    this.year = currentDate.getFullYear();
    //add the first empty goal
    this.addGoal()
  }

  /* changeOffice() { } */

  changeManager() {
    //filter offices from the whole list with the list of offices listed in the manager
    this.filteredOffices = this.constants.main_office_choices.filter(office => this.selectedManager.managerOffice.includes(office[0]));
    console.log(this.filteredOffices)

  }

  focus() {
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





  addGoal() {
    this.goalList.push({...this.emptyGoal})         //use this form in order to create a new instance otherwise it would reference to the same space in memory
  }

  updateGoal(updatedGoal: PegGoal, i: number) {
    this.goalList[i] = updatedGoal;
  }

  openInstructions(template: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(template)
  }


  saveGoals() {
    //check sum of weight is 100
    let weightSum = this.goalList.reduce((sum, goal) => sum + goal.weight, 0)
    console.log(weightSum);
    let data = GC.PEG_ALERT_WEIGHT;
    if (weightSum < 100) {
      this.modalService.openFeedbackModal(false, data)
    } else {
      // add the year, manager and office key: value
      let updatedGoals = this.goalList.map(goal => ({
        ...goal,            // Copy the existing properties of the object
        year: this.year,
        manager: this.selectedManager,
        office: this.selectedOffice
      }))

      console.log(updatedGoals)

      this.api.createGoals(updatedGoals).subscribe(r => console.log(r))
    }
  }


}
