import { Component, Output, EventEmitter } from '@angular/core';
import { PegApiService } from '../../../services/peg-api.service';
import { PegPerson, PegGoal } from 'src/interfaces';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-peg-search-for-reports',
  templateUrl: './peg-search-for-reports.component.html',
  styleUrls: ['./peg-search-for-reports.component.sass']
})
export class PegSearchForReportsComponent {
  
  @Output() goalListPerson = new EventEmitter<PegGoal[]>();

  // selected user for reasearch
  userList$: PegPerson[] = []
  selectedUser: PegPerson = {
    id: 0,
    name: '',
    surname: '',
    jobCategory: '',
    manager: false,
    managerOfOffices: []
  };

  // goal list
  goalList: PegGoal[] = [];

  // year
  year: number = 0;

  // FA icons
  faSearch = faSearch;

  constructor(private api: PegApiService) {
    const currentDate = new Date();
    this.year = currentDate.getFullYear();
    api.userListData$.subscribe(r => { this.userList$ = r; console.log(this.userList$) });
  }

  searchPerson() {
    let data = { year: this.year, id: this.selectedUser.id }
    this.api.getReportPerson(data).subscribe(r => {
      this.goalList = r.data;
      this.goalListPerson.emit(this.goalList)
    })
  }

  

}
