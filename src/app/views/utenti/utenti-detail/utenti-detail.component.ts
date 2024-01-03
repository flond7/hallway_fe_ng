import { Component } from '@angular/core';
import { UtentiApiService } from '../../../services/utenti-api.service';
import { PegPerson } from 'src/interfaces';
import * as GC from '../../../../constants'

@Component({
  selector: 'app-utenti-detail',
  templateUrl: './utenti-detail.component.html',
  styleUrls: ['./utenti-detail.component.sass']
})
export class UtentiDetailComponent {

  // string and messages
  namePA: string = GC.NAME_PA;

  category="D1";
  name = "Elisa";
  surname = "Pessa";
  office = "Servizio informatico";

  credentials = {}


  elisa: PegPerson = {
    id: 1,
    name: 'elisa',
    surname: 'pessa',
    jobCategory: 'D1',
    manager: false,
    managerOfOffices: [],
}

  constructor(private api: UtentiApiService,) {}

  getUserCredentials(user: PegPerson) {
    this.api.getUserCredentials(user).subscribe(r => {
      this.credentials = r.data;
      console.log(this.credentials)
    })
  }
}
