import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { faPlus, faMinus, faCheck, faPen, faTrash, faSearch, faUser, faUserPlus, faXmark, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { PegApiService } from '../../../services/peg-api.service';
import { PegPerson, PegGoal } from '../../../../interfaces';
import * as GC from '../../../../constants'
// Modal imports
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from '../../../services/modals.service'

@Component({
  selector: 'app-peg-goal',
  templateUrl: './peg-goal.component.html',
  styleUrls: ['./peg-goal.component.sass']
})

/* 
    when the user exits an input field blur() emits all the goals values so they can be updated in the parent
*/

export class PegGoalComponent implements OnInit {
  @Input() typeInput: string = '';
  @Input() inputGoal: PegGoal = {
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
  @Output() goalUpdated = new EventEmitter<PegGoal>();
  @Output() sliceElement = new EventEmitter<number>();   //used to send back the info that the element has to be sliced by the parent

  // Users list
  userList: PegPerson[] = [];
  filteredPAUserList: PegPerson[];

  // Searching
  searching: boolean = false;
  searchInput = '';

  involvedForVisualization: PegPerson[] = [];

  // weight computation
  weight_midvalue = 0;

  // FA icons
  faPlus = faPlus; faMinus = faMinus; faCheck = faCheck; faPen = faPen; faTrash = faTrash;
  faSearch = faSearch; faUser = faUser; faUserPlus = faUserPlus; faXmark = faXmark; faExclamation = faExclamation;

  // Modal
  modalRef?: BsModalRef;

  // Delete elements
  confirmDelete: boolean = false;

  constructor(public api: PegApiService, private bsModalService: BsModalService, private modalService: ModalService,) {
    //initialize modalUsers here to create an instance-level var
    this.filteredPAUserList = [];
    api.userListData$.subscribe(r => {
      this.userList = [...r];
      this.filteredPAUserList = [...r];
    })

    // Initialize the involvedForVisualization array for each instance
    this.involvedForVisualization = [];
  }

  ngOnInit() {
    //set to zero the weights we have to calculate later
    this.inputGoal.weight_3006 = 0.0;
    this.inputGoal.weight_3112 = 0.0;

    //set the typù
    this.inputGoal.type = this.typeInput;

    //if inputGoal has involved people keep it and populate involvedForVisualization
    if (this.inputGoal.involvedPeople.length > 0) {
      this.involvedForVisualization = this.inputGoal.involvedPeople.map((userId: number) => {
        return this.userList.find((user) => user.id === userId) as PegPerson;
      });
    }

    //reset the involved person array to empty
    this.inputGoal.involvedPeople = [];
  }

  computeWeights() {
    this.weight_midvalue = this.inputGoal.weight / 2;
    this.inputGoal.weight_3006 = (this.inputGoal.percent_3006 / 100) * this.inputGoal.weight;
    this.inputGoal.weight_3112 = (this.inputGoal.percent_3112 / 100) * this.inputGoal.weight;
  }

  blur() {
    this.goalUpdated.emit(this.inputGoal)
    this.computeWeights()
  }

  onSearchPAUser(event: any) {
    this.searchInput = event?.target.value

    this.filteredPAUserList = this.userList.filter(user =>
      user.name.toLowerCase().includes(this.searchInput.toLowerCase()) ||
      user.surname.toLowerCase().includes(this.searchInput.toLowerCase())
    );
  }

  addInvolvedPeople(person: PegPerson) {
    person.added = true;                            //added is needed to change from (+) add person to (-) remove person in html
    this.inputGoal.involvedPeople.push(person.id);
    this.involvedForVisualization.push(person)      //needed because in the actual object to send back to save and edit, only the ids are required
    //reset searching params
    this.searching = false;
    this.searchInput = '';
  }

  removeInvolvedPeople(person: PegPerson) {
    person.added = false;
    this.involvedForVisualization.forEach((el, index) => {
      if (el == person) this.involvedForVisualization.splice(index, 1);
    });
    console.log(this.involvedForVisualization)
    this.inputGoal.involvedPeople.forEach((el, index) => {
      if (el == person.id) this.inputGoal.involvedPeople.splice(index, 1);
    });
  }

  openModalPeople(template: TemplateRef<any>) {
    //reset filteredPAUserList based on the involved people
    this.filteredPAUserList.forEach(user => {
      //if there is at least one element in involvedForVisualization that has the same user.id 
      //then it returns true and user.added is set to true, otherwise it returns false and added is set to false
      const isUserInvolved = this.involvedForVisualization.some((person) => person.id === user.id);
      user.added = isUserInvolved;
    })

    this.modalRef = this.bsModalService.show(template)
  }

  openModalDelete() {
    const modalResults$ = this.modalService.openDeleteModal(GC.MODAL_DELETE);

    modalResults$.subscribe((result: boolean) => {
      console.log(result)
      if (result === true) {
        // if the modal emitted true (deletion confirmed) emit the id to the parent so it can 
        // add the id to the delete array (to delete it in the BE) and slice it from the array visualized on the FE
        this.sliceElement.emit(this.inputGoal.id);
      }
    });
  }
}