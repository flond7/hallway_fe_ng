import { Component } from '@angular/core';
import * as GC from '../../../../constants'

@Component({
  selector: 'app-utenti-detail',
  templateUrl: './utenti-detail.component.html',
  styleUrls: ['./utenti-detail.component.sass']
})
export class UtentiDetailComponent {

  // string and messages
  namePA: string = GC.NAME_PA;

}
