import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { faPlus, faMinus, faCheck, faPen, faTrash, faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { PegApiService } from '../../../services/peg-api.service';
import { PegPerson, PegGoal } from '../../../../interfaces';
// Modal imports
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-peg-goal',
  templateUrl: './peg-goal.component.html',
  styleUrls: ['./peg-goal.component.sass']
})
export class PegGoalComponent implements OnInit {
  @Input() inputGoal: PegGoal = {
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
  };; 
  @Output() goalUpdated = new EventEmitter<PegGoal>();

  //@ViewChild('searchInput', { static: false }) searchInput: ElementRef;

/* 
  goal: PegGoal = {
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
  }; */

  userList: PegPerson[] = [];
  filteredPAUserList: PegPerson[] = [];
  //involved: PegPerson[] = [];
  //usersNotAdded: PegPerson[] = [];
  managers: PegPerson[] = [];
  searching: boolean = false;
  searchInput = '';

  involvedForVisualization: PegPerson[] = [];
  
  // FA icons
  faPlus = faPlus;
  faMinus = faMinus;
  faCheck = faCheck;
  faPen = faPen;
  faTrash = faTrash;
  faSearch = faSearch; faUserPlus = faUserPlus;

  // Modal
  modalRef?: BsModalRef;


  constructor(public api: PegApiService, private bsModalService: BsModalService, ) { }


  ngOnInit() {
    this.api.getUserList().subscribe(res => { 
      this.userList = res.data;
      this.filteredPAUserList = this.userList;
      this.managers = this.userList;
    })
  }

  
  blur() {
    //it is called evrytime the user exit one input field and updates the object emitting it to the parent component
    this.goalUpdated.emit(this.inputGoal)
  }

  focus(){
    this.searching = true;
    this.filteredPAUserList = this.filteredPAUserList.filter(user => user.added !== true)
  }
  /* filterUserList() {
    this.usersNotAdded = this.userList.filter(user => !this.involved.some(addedUser => addedUser.id === user.id));
    console.log(this.usersNotAdded);
    //remove already added users from this list
    return this.usersNotAdded
  } */

  onSearchPAUser(event:any) {
    this.searchInput = event?.target.value
    //start with all the user then
    this.filteredPAUserList = this.userList.filter(user =>
      user.name.toLowerCase().includes(this.searchInput.toLowerCase()) ||
      user.surname.toLowerCase().includes(this.searchInput.toLowerCase())
    );
  }



  addInvolvedPeople(person: PegPerson) {
    person.added = true;
    //this.inputGoal.involvedPeople.push(person);
    this.inputGoal.involvedPeople.push(person.id);
    this.involvedForVisualization.push(person)    //needed because in the actual object to send back to save and edit, only the ids are required
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

  onSearchOffice(event: any){
    console.log(event)
  }
  focusOffice(){}

  openModalPeople(template: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(template)
  }

  openModalDelete() {
    //.modalRef = this.bsModalService.show(template)
  }
}
