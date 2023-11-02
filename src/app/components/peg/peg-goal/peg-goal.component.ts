import { Component, OnInit, Input, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { faPlus, faMinus, faCheck, faPen, faTrash, faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { PegApiService } from '../../../services/peg-api.service';
import { PegPerson, PegGoal, PegOffice } from '../../../../interfaces';
// Modal imports
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-peg-goal',
  templateUrl: './peg-goal.component.html',
  styleUrls: ['./peg-goal.component.sass']
})
export class PegGoalComponent implements OnInit {

  //@ViewChild('searchInput', { static: false }) searchInput: ElementRef;

  goal: PegGoal = {
    id: 0,
    name: '',
    description: '',
    weight: 0,
    responsable: null,
    office: null,
    year: 0,
    involvedPeople: [],
    completation3006: 0,
    completation3112: 0,
  };

  officeList: PegOffice[] = [];                       //office list to retrive with API
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

  changeOffice(){  }
  ChangeResponsable() { }

  

  focus(){
    this.searching = true;
    this.filteredPAUserList = this.filteredPAUserList.filter(user => user.added !== true)
  }
  blur(){
    this.searching = false;
    this.filteredPAUserList = [];
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
    //this.filterUserList();
    //this.searchInput.nativeElement.value = ''; // Reset the input field
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
