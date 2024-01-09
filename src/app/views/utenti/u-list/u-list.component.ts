import { Component } from '@angular/core';
import { UtentiApiService } from '../../../services/utenti-api.service';
import * as GC from '../../../../constants'

@Component({
  selector: 'app-u-list',
  templateUrl: './u-list.component.html',
  styleUrls: ['./u-list.component.sass']
})
export class UListComponent {

  credentials: any;
  financial = GC.U_NAME_FINANCIAL;
  adweb = GC.U_NAME_ADWEB;
  protocol = GC.U_NAME_PROTOCOL;
  voip = GC.U_NAME_VOIP;
  lan = GC.U_NAME_LAN;
  website = GC.U_NAME_WEBSITE;
  mail = GC.U_NAME_MAIL;

  constructor(private api: UtentiApiService,) { }

  getUserList() {
    this.api.getListUserCredentials().subscribe(r => {
      this.credentials = r.data;
      console.log(this.credentials)
    })
  }

}
