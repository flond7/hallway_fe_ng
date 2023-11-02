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
    responsable: null,
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
    responsable: null,
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
  involved: PegPerson[] = [];
  //usersNotAdded: PegPerson[] = [];
  responsables: PegPerson[] = [];
  searching: boolean = false;
  searchInput = '';
  
  // FA icons
  faPlus = faPlus;
  faMinus = faMinus;
  faCheck = faCheck;
  faPen = faPen;
  faTrash = faTrash;
  faSearch = faSearch; faUserPlus = faUserPlus;

  // Modal
  modalRef?: BsModalRef;


  constructor(public api: PegApiService, private bsModalService: BsModalService, ) { 
    // Initialize searchInput to null
    //this.searchInput = new ElementRef(null);
}


  ngOnInit() {
    this.api.getUserList().subscribe(res => { 
      this.userList = res.data;
      this.filteredPAUserList = this.userList;
      this.responsables = this.userList;
    })
  }

  
  blur() {
    //it is called evrytime the user exit one input field and updates the object emitting it to the parent component
    console.log(this.inputGoal);
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
    console.log(this.filteredPAUserList)
  }



  addInvolvedPeople(person: PegPerson) {
    person.added = true;
    this.involved.push(person);
    this.searching = false;
    this.searchInput = '';
  }

  removeInvolvedPeople(person: PegPerson) {
    person.added = false;
    this.involved.forEach((el, index) => {
      if (el == person) this.involved.splice(index, 1);
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
