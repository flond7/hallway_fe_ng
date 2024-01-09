import { Component } from '@angular/core';
import { UtentiApiService } from '../../../services/utenti-api.service';
import { PegPerson } from 'src/interfaces';

import { faEnvelope, faNetworkWired, faHatWizard, faFile, faMoneyBill, faPhone } from '@fortawesome/free-solid-svg-icons';
import * as GC from '../../../../constants'

@Component({
  selector: 'app-utenti-detail',
  templateUrl: './utenti-detail.component.html',
  styleUrls: ['./utenti-detail.component.sass']
})
export class UtentiDetailComponent {

  // FA icons
  faEnvelope = faEnvelope; faNetworkWired = faNetworkWired; faHatWizard = faHatWizard; faFile = faFile; faMoneyBill = faMoneyBill; faPhone = faPhone;


  financial = GC.U_NAME_FINANCIAL;
  adweb = GC.U_NAME_ADWEB;
  protocol = GC.U_NAME_PROTOCOL;
  voip = GC.U_NAME_VOIP;
  lan = GC.U_NAME_LAN;

  // string and messages
  namePA: string = GC.NAME_PA;

  category="D1";
  name = "Elisa";
  surname = "Pessa";
  office = "Servizio informatico";


  elisa: PegPerson = {
    id: 1,
    name: '',
    surname: '',
    jobCategory: '',
    manager: false,
    managerOfOffices: [],
}

credentials: any;

  constructor(private api: UtentiApiService,) {}

  getUserCredentials(user: PegPerson) {
    this.api.getUserCredentials(user).subscribe(r => {
      this.credentials = r.data[0];
      console.log(this.credentials)
    })
  }
}
