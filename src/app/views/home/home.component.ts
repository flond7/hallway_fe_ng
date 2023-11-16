import { Component } from '@angular/core';
import { faUsers, faFolderOpen, faBullseye } from '@fortawesome/free-solid-svg-icons';
import { PegApiService } from 'src/app/services/peg-api.service';
import { AccessoAttiApiService } from 'src/app/services/accessoAtti-api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {

  // FA icons
  faUsers = faUsers; faBullseye = faBullseye; faFolderOpen = faFolderOpen;

  permission_users = true;
  permission_peg : string | null = "";
  permission_accessoAtti: string | null = "";

  constructor (public aaService: AccessoAttiApiService, public pegService: PegApiService) {}
  ngOnInit(): void {
    //reset authorizations
    this.permission_accessoAtti = 'false';
    this.permission_peg = 'false';
    //check authorizations
    this.permission_accessoAtti = this.aaService.check_AA_Authorization();
    this.permission_peg = this.pegService.check_PEG_Authorization();
  }
}
