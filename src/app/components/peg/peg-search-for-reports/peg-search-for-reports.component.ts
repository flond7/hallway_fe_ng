import { Component } from '@angular/core';
import { PegApiService } from '../../../services/peg-api.service';
import { PegPerson } from 'src/interfaces';
import { faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-peg-search-for-reports',
  templateUrl: './peg-search-for-reports.component.html',
  styleUrls: ['./peg-search-for-reports.component.sass']
})
export class PegSearchForReportsComponent {

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

// FA icons
faSearch = faSearch;

constructor(private api: PegApiService) {
  api.userListData$.subscribe(r=> {this.userList$ = r; console.log(this.userList$)});
 }

 searchPerson() {
  let data = {year: 2023, id: this.selectedUser.id}
  this.api.getReportPerson(data).subscribe(r => console.log(r))
 }

}
