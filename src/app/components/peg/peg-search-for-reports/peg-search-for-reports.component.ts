import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PegApiService } from '../../../services/peg-api.service';
import { PegPerson, PegGoal, PegOffice } from 'src/interfaces';
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
  @Output() selectedOfficeOutput = new EventEmitter<PegOffice>();

  // selected user for reasearch
  userList$: PegPerson[] = [];
  managerList$: PegPerson[] = [];
  officeList$: PegOffice[] = [];
  selectedUser: PegPerson = {
    id: 0,
    name: '',
    surname: '',
    jobCategory: '',
    manager: false,
    managerOfOffices: []
  };
  selectedManager: PegPerson = {
    id: 0,
    name: '',
    surname: '',
    jobCategory: '',
    manager: false,
    managerOfOffices: []
  };
  selectedOffice: PegOffice = {
    id: 0,
    name: ''
  }

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
    api.officeListData$.subscribe(r => { this.officeList$ = r; });
    api.managerListData$.subscribe(r => { this.managerList$ = r; });
  }

  ngOnInit(): void {
    console.log(this.tab);
  }

  searchReport() {
    console.log(this.tab);
    if (this.tab.reportManager === true) {
      let data = { year: this.year, id: this.selectedManager.id }
      console.log('user');
      console.log(data);
      this.api.getReportPo(data).subscribe(r => {
        this.goalList = r.data;
        this.goalListPerson.emit(this.goalList)
        this.selectedUserOutput.emit(this.selectedManager)
      })
    } else if (this.tab.reportPerson === true) {
      let data = { year: this.year, id: this.selectedUser.id }
      console.log('user');
      console.log(data);
      this.api.getReportPerson(data).subscribe(r => {
        this.goalList = r.data;
        this.goalListPerson.emit(this.goalList)
        this.selectedUserOutput.emit(this.selectedUser)
      })
    } else if (this.tab.reportOffice === true) {
      let data = { year: this.year, id: this.selectedOffice.id }
      this.api.getReportOffice(data).subscribe(r => {
        this.goalList = r.data;
        this.goalListPerson.emit(this.goalList)
        this.selectedOfficeOutput.emit(this.selectedOffice)
      })
    } else {
      let data = { year: this.year }

    }
  }


}
