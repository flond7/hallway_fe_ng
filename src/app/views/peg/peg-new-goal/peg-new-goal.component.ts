import { Component, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PegPerson, PegOffice, PegGoal, PegPoOffice } from 'src/interfaces';
import { PegApiService } from '../../../services/peg-api.service';
import * as GC from '../../../../constants';

import { faFloppyDisk, faPlus } from '@fortawesome/free-solid-svg-icons';
// Modal imports
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from '../../../services/modals.service'


@Component({
  selector: 'app-peg-new-goal',
  templateUrl: './peg-new-goal.component.html',
  styleUrls: ['./peg-new-goal.component.sass']
})
export class PegNewGoalComponent {

  // initial vars
  year: number = 0;
  addNew = true;       //to keep track if this is the add or the edit page

  // Office selection and manager selection
  //officeList$: PegOffice[] = [];
  officeList$: PegPoOffice[] = [];
  selectedOffice: PegOffice = {
    id: 0,
    name: 'Seleziona un ufficio'
  };
  selectedManager: PegPerson = {
    id: 0,
    name: '',
    surname: '',
    jobCategory: '',
    manager: false,
    managerOfOffices: []
  }
  
  modalRefOffice!: BsModalRef;

  // tab control
  extraordinary: boolean = true;
  extraordinaryTitle: string = GC.PEG_GOAL_EXTRAORDINARY_TITLE;
  ordinaryTitle: string = GC.PEG_GOAL_ORDINARY_TITLE;

  // Css control
  primarypeg = GC.COLOR_PRIMARY_PEG;
  dark = GC.COLOR_DARK;
  white = GC.COLOR_WHITE;
  white1 = GC.COLOR_WHITE_ONE;
  white2 = GC.COLOR_WHITE_TWO;
  white3 = GC.COLOR_WHITE_THREE;

  // Goal list
  goalList: PegGoal[] = [];                     //goal list is the concat of the extra and ordinary goal lists
  extraordinaryGoalList: PegGoal[] = [];
  ordinaryGoalList: PegGoal[] = [];
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

  // total calculation
  extraordinaryTotals: number[] = [];   //these arrays contain the result of getTotals(), weight, weight3006, weight3112, so you can access them as xxxxTotal[0], [1] or [2] in the template
  ordinaryTotals: number[] = [];

  // Delete element
  deleteArray: number[] = [];

  // FA icons
  faFloppyDisk = faFloppyDisk; faPlus = faPlus;

  constructor(private api: PegApiService, private modalService: ModalService, public bsModalService: BsModalService, private router: Router, private route: ActivatedRoute) {
    const currentDate = new Date();
    this.year = currentDate.getFullYear();

    api.officeAndPoListData$.subscribe(r => {
      this.officeList$ = r;
      console.log(r)
    })

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // Get the value of a parameter by its name
      let edit = params.get('edit');
      if (edit === 'true') {
        this.addNew = false;
      }
    });
  }

  openModal(modal: TemplateRef<any>) {
    this.modalRefOffice = this.bsModalService.show(modal);
  }

  selectOffice(office: PegPoOffice) {
    this.selectedOffice = office;
    this.selectedManager = office.manager;
    //if this is an edit page then retrieve the info
    if (this.addNew === false) {
      let data = { year: this.year, id: this.selectedOffice.id }
      this.api.getReportOffice(data).subscribe(r => {
        this.goalList = r.data;
        //separate goals in ordinary and extraordinary
        this.ordinaryGoalList = r.data.filter((g: PegGoal) => g.type === "ordinary");
        this.extraordinaryGoalList = r.data.filter((g: PegGoal) => g.type === "extraordinary");
      })
    } else {
    //if this an add page check if there are already records for this office and year and if there are redirect to the edit page
    let checkData = {'year': this.year, 'officeId': this.selectedOffice.id}
    this.api.checkExistingRecords(checkData).subscribe(r => {
        console.log(r)
        //if there are records already in the DB, open a modal to tell the user and redirect to edit page
        if (r === true) {
          this.modalRefOffice.hide();
          this.modalService.openFeedbackModal(false, GC.PEG_MODAL_RECORD_EXIST);
          this.router.navigate(['/peg-edit']);
        }
    })  
    }
  }

  getTotals(list: PegGoal[]) {
    const weight = list.reduce((sum, goal) => sum + goal.weight, 0);
    const weight3006 = list.reduce((sum, goal) => {
      if (goal.weight_3006 !== undefined) {
        return sum + goal.weight_3006;
      }
      return sum;
    }, 0)
    const weight3112 = list.reduce((sum, goal) => {
      if (goal.weight_3112 !== undefined) {
        return sum + goal.weight_3112;
      }
      return sum;
    }, 0)
    return [weight, weight3006, weight3112]
  }

  addExtraGoal() {
    this.extraordinaryGoalList.push({ ...this.emptyGoal })         //use this form in order to create a new instance otherwise it would reference to the same space in memory
  }

  updateExtraGoal(updatedGoal: PegGoal, i: number) {
    this.extraordinaryGoalList[i] = updatedGoal;
    this.extraordinaryTotals = this.getTotals(this.extraordinaryGoalList);
  }

  addOrdGoal() {
    this.ordinaryGoalList.push({ ...this.emptyGoal })         //use this form in order to create a new instance otherwise it would reference to the same space in memory
  }

  updateOrdGoal(updatedGoal: PegGoal, i: number) {
    this.ordinaryGoalList[i] = updatedGoal;
    this.ordinaryTotals = this.getTotals(this.ordinaryGoalList);
  }

  saveGoals() {
    console.log(this.year.toString().length)

    //check if office is selected (PO is a consequence of that)
    if (this.selectedOffice.id === 0) {
      this.modalService.openFeedbackModal(false, GC.PEG_ALERT_PO_OFFICE)
    }

    //prepare text for modals
    let data = GC.PEG_ALERT_WEIGHT;

    let weightExtraSum = this.extraordinaryGoalList.reduce((sum, goal) => sum + goal.weight, 0);
    let weightOrdSum = this.ordinaryGoalList.reduce((sum, goal) => sum + goal.weight, 0);

    //if there is no input there is nothing to save
    if (this.extraordinaryGoalList.length === 0 && this.ordinaryGoalList.length === 0 ) {
      this.modalService.openFeedbackModal(false, GC.MODAL_NO_INPUT)

    //if there are goals in ordinary or extraordinary array and thery wieth sum is not 100, open modal
    } else if ((this.extraordinaryGoalList.length > 0 && weightExtraSum !== 100) ||  (this.ordinaryGoalList.length !== 0 && weightOrdSum !== 100)) {
      this.modalService.openFeedbackModal(false, data)
    
    //if there is some input and the weight is correct === 100
    } else {
      //if the weights are correct join the two goal lists then check if we're updating or creating new goals
      this.goalList = this.extraordinaryGoalList.concat(this.ordinaryGoalList);

      //add the missing fields to every single goal
      let updatedGoals = this.goalList.map(({ id, ...goal }) => ({        // this separetes the fake id (0) from all the other key:values and leaves to the BE to create it 
        ...goal,                                                          // copy the other key: values in the new object
        ...(id !== 0 ? { id } : {}),                                      // if id !==0 then leave id otherwhise take out the key:value pair
        year: this.year,
        manager: this.selectedManager.id,
        office: this.selectedOffice.id,
      }))

      //if addNew === true this is the add page
      if (this.addNew === true) {
        console.log('creating')
        this.api.createGoals(updatedGoals).subscribe(r => {
          console.log(r);
          this.router.navigate(['/peg-home']);
        })

      } else {
        //if addNew === false this is the edit page
        console.log('editing')
        //if there are items to delay deley them, empty the delete array and then update the remaining ones
        if (this.deleteArray.length > 0) {
          this.api.deleteGoals(this.deleteArray).subscribe(r => {
            this.deleteArray = [];
            //update the records and handle eventual creation of new goals
            this.api.updateGoals(updatedGoals).subscribe(r => {
              console.log(r);
              this.router.navigate(['/peg-home']);
            })
          })
        } else {
          //if there is nothing to be deleted just update the records
          this.api.updateGoals(updatedGoals).subscribe(r => {
            this.router.navigate(['/peg-home']);
          })
        }
      }
    }
  }

  deleteExtraGoal(id: number, i: number) {
    //if this is an edit page add the goal to the delete array in order to delete it from the server afterwards
    if (this.addNew === false) {
      this.deleteArray.push(id);
    }
    //slice the element from goalList
    this.extraordinaryGoalList.splice(i, 1);
  }

  deleteOrdGoal(id: number, i: number) {
    //if this is an edit page add the goal to the delete array in order to delete it from the server afterwards
    if (this.addNew === true) {
      this.deleteArray.push(id);
    }
    //slice the element from goalList
    this.ordinaryGoalList.splice(i, 1);
  }


/* 
  
  saveGoals() {
    //check if office is selected (PO is a consequence of that)
    if (this.selectedOffice.id === 0) {
      this.modalService.openFeedbackModal(false, GC.PEG_ALERT_PO_OFFICE)
    }

    //prepare text for modals
    let data = GC.PEG_ALERT_WEIGHT;

    //if there are goals in ordinary or extraordinary array and thery wieth sum is not 100, open modal
    let weightExtraSum = this.extraordinaryGoalList.reduce((sum, goal) => sum + goal.weight, 0);
    let weightOrdSum = this.ordinaryGoalList.reduce((sum, goal) => sum + goal.weight, 0);
    if ((this.extraordinaryGoalList.length > 0 && weightExtraSum !== 100) ||  (this.ordinaryGoalList.length > 0 && weightOrdSum !== 100)) {
      this.modalService.openFeedbackModal(false, data)
    } else {
      //if the weights are correct join the two goal lists then check if we're updating or creating new goals
      this.goalList = this.extraordinaryGoalList.concat(this.ordinaryGoalList);

      //add the missing fields to every single goal
      let updatedGoals = this.goalList.map(({ id, ...goal }) => ({        // this separetes the fake id (0) from all the other key:values and leaves to the BE to create it 
        ...goal,                                                          // copy the other key: values in the new object
        ...(id !== 0 ? { id } : {}),                                      // if id !==0 then leave id otherwhise take out the key:value pair
        year: this.year,
        //manager: this.selectedManager.id,
        office: this.selectedOffice.id,
      }))

    }

    
    if (weightOrdSum != 100) {
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
       /*  console.log('creating')
        this.api.createGoals(updatedGoals).subscribe(r => {
          console.log(r);
          this.router.navigate(['/peg-home']);
        })
      } else {
        console.log('updating') */
        /* let updatedGoals = this.goalList.map(goal => ({
          ...goal,                                                          // copy the other key: values in the new object
          year: this.year,
          manager: this.selectedManager.id,     
          office: this.selectedOffice.id,       
          type: this.type
        })) */
        //console.log(updatedGoals)
        //delete the records in the delete array and empty the array
       /* if (this.deleteArray.length > 0) {

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
  } */

}
