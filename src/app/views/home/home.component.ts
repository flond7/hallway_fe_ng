import { Component } from '@angular/core';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faBullseye } from '@fortawesome/free-solid-svg-icons';
import { PegApiService } from 'src/app/services/peg-api.service';
import { AccessoAttiApiService } from 'src/app/services/accessoAtti-api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  faUsers = faUsers;
  faBullseye = faBullseye;

  permission_users = true;
  permission_peg : string | null = "";
  permission_accessoAtti: string | null = "";

  constructor (public api: PegApiService, public aaService: AccessoAttiApiService) {}
  ngOnInit(): void {
    //check authorizations
    this.permission_accessoAtti = this.aaService.check_AA_Authorization();
    console.log(this.permission_accessoAtti);
    this.permission_peg = 'true';
  }
}
