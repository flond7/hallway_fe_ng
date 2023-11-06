import { Component } from '@angular/core';
import { PegApiService } from '../../../services/peg-api.service';
import { PegPerson } from 'src/interfaces';

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

constructor(private api: PegApiService) {
  api.userListData$.subscribe(r=> {this.userList$ = r; console.log(this.userList$)});
 }

}
