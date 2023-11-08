import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PegApiService } from '../../../services/peg-api.service';
import { PegPerson, PegGoal } from 'src/interfaces';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-peg-search-for-reports',
  templateUrl: './peg-search-for-reports.component.html',
  styleUrls: ['./peg-search-for-reports.component.sass']
})
export class PegSearchForReportsComponent implements OnInit {
  @Input() tab: any;
  @Output() goalListPerson = new EventEmitter<PegGoal[]>();
  @Output() selectedUserOutput = new EventEmitter<PegPerson>();

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

  // search po
  managerItIs = false;

  // FA icons
  faSearch = faSearch;

  constructor(private api: PegApiService) {
    const currentDate = new Date();
    this.year = currentDate.getFullYear();
    api.userListData$.subscribe(r => { this.userList$ = r; });
  }
  ngOnInit(): void {
    console.log(this.tab);
  }

  searchPerson() {
    console.log(this.tab)
    let data = { year: this.year, id: this.selectedUser.id }
    if (this.managerItIs === true) {
      this.api.getReportPo(data).subscribe(r => {
        this.goalList = r.data;
        this.goalListPerson.emit(this.goalList)
        this.selectedUserOutput.emit(this.selectedUser)
      })
    } else  {
      this.api.getReportPerson(data).subscribe(r => {
        this.goalList = r.data;
        this.goalListPerson.emit(this.goalList)
        this.selectedUserOutput.emit(this.selectedUser)
      })
  }


  }


}
