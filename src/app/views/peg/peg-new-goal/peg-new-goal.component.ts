import { Component, Input } from '@angular/core';
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

  goal = {
    'office': 'Segreteria',
    'people': [],
    'responsable': 'Dott.ssa Patrizia Mascellino'
  }

  addedPAUserList = [];

  offices: any;                       //office list to retrive with API
  involved: Array<PegPerson> = [];
  //markers: Array<PegIndicator> = [];
  userList: PegPerson[] = [];
  filteredPAUserList: Array<PegPerson> = [];
  searching = false;

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

  constructor(public api: PegApiService) { }

  ngOnInit(): void {
    //this.api.getOfficeList().subscribe(res =>{this.offices = res})
    this.api.getUserList().subscribe(res => { this.userList = res.data; })

  }


  changeOffice() { }
  ChangeResponsable() { }


  focus(){
    this.searching = true;
    this.filteredPAUserList = this.userList;
  }
  blur(){
    this.searching = false;
    this.filteredPAUserList = [];
  }

  onSearchPAUser(event: any) {
    const query = event.target.value;
    console.log(this.searching)
    this.filteredPAUserList = this.userList.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.surname.toLowerCase().includes(query.toLowerCase())
    );
  }
  addInvolvedPeople() {
  }



/*   addInvolvedPeople(person: PegPerson) {
    person.added = true;
    this.involved.push(person);
    console.log(this.involved)
  }
 */  removeInvolvedPeople(person: PegPerson) {
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
