import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { faPlus, faMinus, faCheck, faPen, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { PegApiService } from '../../../services/peg-api.service';
import { PegPerson } from '../../../../interfaces';
import * as GC from '../../../../constants'
import { disableDebugTools } from '@angular/platform-browser';



@Component({
  selector: 'app-peg-new-goal',
  templateUrl: './peg-new-goal.component.html',
  styleUrls: ['./peg-new-goal.component.sass']
})
export class PegNewGoalComponent {

  //@Input() phases: any;
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;

  goal = {
    'office': 'Segreteria',
    'responsable': 'Dott.ssa Patrizia Mascellino'
  }

  addedPAUserList = [];

  offices: any;                       //office list to retrive with API
  userList: PegPerson[] = [];
  filteredPAUserList: PegPerson[] = [];
  involved: PegPerson[] = [];
  searching: boolean = false;

  // FA icons
  faPlus = faPlus;
  faMinus = faMinus;
  faCheck = faCheck;
  faPen = faPen;
  faTrash = faTrash;
  faSearch = faSearch;

  /* REACTIVE FORM */
  goalForm = new FormGroup({
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
  get phasesFormArray() { return this.goalForm.get("phases") as FormArray; }

  constructor(public api: PegApiService) { 
    // Initialize searchInput to null
    this.searchInput = new ElementRef(null);
}

  ngOnInit(): void {
    //this.api.getOfficeList().subscribe(res =>{this.offices = res})
    this.api.getUserList().subscribe(res => { this.userList = res.data; })

  }


  changeOffice() { }
  ChangeResponsable() { }


  focus(){
    this.searching = true;
    this.filteredPAUserList = this.filteredPAUserList.filter(user => user.added !== true)
  }
  blur(){
    this.searching = false;
    this.filteredPAUserList = [];
  }

  onSearchPAUser(event: any) {
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
  }



  addInvolvedPeople(person: PegPerson) {
    person.added = true;
    this.involved.push(person);
    this.searching = false;
    console.log(this.searchInput)
    this.searchInput.nativeElement.value = ''; // Reset the input field
  }

  removeInvolvedPeople(person: PegPerson) {
    person.added = false;
    this.involved.forEach((el, index) => {
      if (el == person) this.involved.splice(index, 1);
    });
  }





  submit() {
    console.log(this.goalForm.value)
    console.log(this.markers)
  }

}
