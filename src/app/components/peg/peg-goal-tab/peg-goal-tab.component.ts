import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  // reuse the component for edit
  @Input() goalListInput: PegGoal[] = [];     //needed to get the input list  
  @Input() addNew: boolean = true;            //needed to change the api call with the save button
  @Input() selectedOfficeInput: PegOffice = {
    id: 0,
    name: ''
  };

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
  //involved: PegPerson[] = [];

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

  // Delete element
  deleteArray: number[] = [];

  // FA icons
  faPlus = faPlus;
  faMinus = faMinus;

  constructor(public api: PegApiService, private bsModalService: BsModalService, public modalService: ModalService, private router: Router, private route: ActivatedRoute) {
    api.userListData$.subscribe(r => {
      this.userList = r;
    })

    api.managerListData$.subscribe(r => {
      this.managers = r;
    })
  }

  ngOnInit(): void {
    //calculate the current year to show it as default value
    const currentDate = new Date();
    this.year = currentDate.getFullYear();

    //if it's the add page add the first epty goal
    if (this.addNew === true) {
      this.addGoal()
    } else {
      //if it's the edit page
      this.goalList = this.goalListInput;
      // set the selected manager because the office is set as a consequence of that
      const foundManager = this.managers.find(manager => manager.id === this.goalList[0].manager!.id);
      if (foundManager !== undefined) {
        this.selectedManager = foundManager;
        //set the office
        const foundOffice = this.selectedManager.managerOfOffices.find(office => office.id === this.goalList[0].office.id);
        if (foundOffice !== undefined) {
          this.selectedOffice = foundOffice;
        }
      }

      console.log(typeof (this.goalList[0].manager));
    }
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

  saveGoals() {
    //check if po and office are selected
    if (this.selectedManager.id === 0 || this.selectedOffice.id === 0) {
      this.modalService.openFeedbackModal(false, GC.PEG_ALERT_PO_OFFICE)
    }

    //check sum of weight is 100
    let weightSum = this.goalList.reduce((sum, goal) => sum + goal.weight, 0);
    let data = GC.PEG_ALERT_WEIGHT;
    if (weightSum != 100) {
      this.modalService.openFeedbackModal(false, data)
    } else {
      // if id = 0 the record is new therefore delete the id field from goal
      // otherwise leave id because it's a record that needs to be update
      
      let updatedGoals = this.goalList.map(({ id, ...goal }) => ({        // this separetes the fake id (0) from all the other key:values and leaves to the BE to create it 
        ...goal,                                                          // copy the other key: values in the new object
        ...(id !== 0 ? { id } : {}),                                      // if id !==0 then leave id otherwhise take out the key:value pair
        year: this.year,
        manager: this.selectedManager.id,
        office: this.selectedOffice.id,
        type: this.type
      }))





      // if it's the add page
      if (this.addNew === true) {
        console.log(this.selectedOffice)
        // add the year, manager and office key: value
        /* let updatedGoals = this.goalList.map(({ id, ...goal }) => ({        // this separetes the fake id (0) from all the other key:values and leaves to the BE to create it 
          ...goal,                                                          // copy the other key: values in the new object
          year: this.year,
          manager: this.selectedManager.id,
          office: this.selectedOffice.id,
          type: this.type
        })) */
        console.log('creating')
        this.api.createGoals(updatedGoals).subscribe(r => {
          console.log(r);
          this.router.navigate(['/peg-home']);
        })
      } else {
        console.log('updating')
        /* let updatedGoals = this.goalList.map(goal => ({
          ...goal,                                                          // copy the other key: values in the new object
          year: this.year,
          manager: this.selectedManager.id,     
          office: this.selectedOffice.id,       
          type: this.type
        })) */
        console.log(updatedGoals)
        //delete the records in the delete array and empty the array
        if (this.deleteArray.length > 0) {

          console.log(this.deleteArray);
          console.log(typeof this.deleteArray);
          this.api.deleteGoals(this.deleteArray).subscribe(r => {
            console.log(r);
            this.deleteArray = [];
            //update the records and handle eventual creation of new goals
            this.justUpdateGoals(updatedGoals)
          })
        } else {
          //if there is nothing to be deleted just update the records
          this.justUpdateGoals(updatedGoals)
        }

      }
    }
  }

  justUpdateGoals(updatedGoals: any) {
    this.api.updateGoals(updatedGoals).subscribe(r => {
      console.log(r);
      this.modalService.openFeedbackModal(true, GC.MODAL_MESSAGE_CREATION_OK)
      this.router.navigate(['/peg-home']);
    })
  }

  deleteGoal(id: number, i: number) {
    //add the id to the delete array
    this.deleteArray.push(id);
    //slice the element from goalList
    this.goalList.splice(i, 1);
  }

}
