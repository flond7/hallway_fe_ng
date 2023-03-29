import { Component } from '@angular/core';
import { faUsers, faBullseye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-peg-menu',
  templateUrl: './peg-menu.component.html',
  styleUrls: ['./peg-menu.component.sass']
})
export class PegMenuComponent {

  faUsers = faUsers;
  faBullseye = faBullseye;

}
