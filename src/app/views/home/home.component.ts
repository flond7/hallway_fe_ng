import { Component } from '@angular/core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { PegApiService } from 'src/app/services/peg-api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  faUsers = faUsers;
  faBullseye = faBullseye;

  permission_users = true;
  permission_peg = true;
  permission_accessoAtti = true;

  constructor (public api: PegApiService) {}
  ngOnInit(): void {
    
  }
}
