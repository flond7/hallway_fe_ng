import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { faPlus, faMinus, faCheck, faPen, faTrash, faSearch, faUserPlus, faXmark, faExclamation} from '@fortawesome/free-solid-svg-icons';
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
    type: '',
  };; 
  @Output() goalUpdated = new EventEmitter<PegGoal>();

  userList: PegPerson[] = [];
  filteredPAUserList: PegPerson[] = [];
  searching: boolean = false;
  searchInput = '';

  involvedForVisualization: PegPerson[] = [];
  
  // weight computation
  weight_midvalue = 0;

  // FA icons
  faPlus = faPlus;
  faMinus = faMinus;
  faCheck = faCheck;
  faPen = faPen;
  faTrash = faTrash;
  faSearch = faSearch; faUserPlus = faUserPlus; faXmark=faXmark;faExclamation=faExclamation;

  // Modal
  modalRef?: BsModalRef;


  constructor(public api: PegApiService, private bsModalService: BsModalService, ) { }

  /* 
    when the user exits an input field blur() emits all the goals values so they can be updated in the parent
  */

  ngOnInit() {
    this.api.getUserList().subscribe(res => { 
      this.userList = res.data;
      this.filteredPAUserList = this.userList;
      this.inputGoal.weight_3006 = 0.0
      this.inputGoal.weight_3112 = 0.0
    })
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

  focus(){
    this.searching = true;
    this.filteredPAUserList = this.filteredPAUserList.filter(user => user.added !== true)
  }

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

  openModalPeople(template: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(template)
  }

  openModalDelete() {
    //.modalRef = this.bsModalService.show(template)
  }
}
