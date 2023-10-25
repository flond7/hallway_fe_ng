import { Component } from '@angular/core';
import { AccessoAttiApiService } from '../../../services/accessoAtti-api.service';
//import * as GC from '../../../../constants'

@Component({
  selector: 'app-aa-list-access',
  templateUrl: './aa-list-access.component.html',
  styleUrls: ['./aa-list-access.component.sass']
})
export class AaListAccessComponent {

  year: number = 2023;
  list = [];

  constructor(public api: AccessoAttiApiService) { }



  getAccessRegister(y: number) {
    this.api.getAccessList().subscribe(r => { this.list = r.data})
  }

}