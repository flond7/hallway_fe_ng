import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { PegApiService } from '../../../services/peg-api.service';
import { PegPerson, PegGoal, PegOffice } from '../../../../interfaces';
import * as GC from '../../../../constants'
// Modal imports
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from '../../../services/modals.service';

@Component({
  selector: 'app-peg-goal-tab',
  templateUrl: './peg-goal-tab.component.html',
  styleUrls: ['./peg-goal-tab.component.sass']
})
export class PegGoalTabComponent {
  @Input() title: string = '';
  @Input() type: string = '';
  @Input() goalListInput: PegGoal[] = [];

  @Output() goalListUpdated = new EventEmitter<PegGoal>();

  // Modal
  modalRef?: BsModalRef;
  pegInstructions = GC.PEG_INSTRUCTIONS;

  // Search 
  year: number = 0;
  searching: boolean = false;

  // Manage users in selects and involved people
  userList: PegPerson[] = [];
  filteredPAUserList: PegPerson[] = [];
  involved: PegPerson[] = [];

  // Manager select
  managers: PegPerson[] = [];
  selectedManager: PegPerson = {
    id: 0,
    name: '',
    surname: '',
    jobCategory: '',
    manager: true,
    managerOfOffices: []
  };

  // Office select
  selectedOffice: PegOffice = {
    id: 0,
    name: '',           // this is the o1, o2, o3... value for the office
  };  

  // goal
  goalList: PegGoal[] = [];
  emptyGoal: PegGoal = {
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

  // FA icons
  faPlus = faPlus;
  faMinus = faMinus;

  constructor(public api: PegApiService, private bsModalService: BsModalService, public modalService: ModalService) { }

  ngOnInit(): void {
    //get user list, po list and constant list
    this.api.getUserList().subscribe(res => { this.userList = res.data; })
    this.api.getPoList().subscribe(res => { this.managers = res.data; })
    //calculate the current year to show it as default value
    const currentDate = new Date();
    this.year = currentDate.getFullYear();
    //add the first empty goal
    this.addGoal()
  }

  addGoal() {
    this.goalList.push({ ...this.emptyGoal })         //use this form in order to create a new instance otherwise it would reference to the same space in memory
  }

  updateGoal(updatedGoal: PegGoal, i: number) {
    this.goalList[i] = updatedGoal;
  }

  openInstructions(template: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(template)
  }

/*   focus() {
    this.searching = true;
    this.filteredPAUserList = this.filteredPAUserList.filter(user => user.added !== true)
  } */

  saveGoals() {
    //check sum of weight is 100
    let weightSum = this.goalList.reduce((sum, goal) => sum + goal.weight, 0);
    let data = GC.PEG_ALERT_WEIGHT;
    if (weightSum != 100) {
      this.modalService.openFeedbackModal(false, data)
    } else {
      // add the year, manager and office key: value
      let updatedGoals = this.goalList.map(({ id, ...goal }) => ({        // this separetes the id from all the other key:values
        ...goal,                                                          // copy the other key: values in the new object
        year: this.year,
        manager: this.selectedManager.id,
        office: this.selectedOffice.id,
        type: this.type
      }))
      console.log(updatedGoals);
      this.api.createGoals(updatedGoals).subscribe(r => console.log(r))
    }
  }


}
