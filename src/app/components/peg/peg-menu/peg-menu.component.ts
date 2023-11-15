import { Component } from '@angular/core';
import { faUsers, faBullseye, faHome, faPlus, faPen, faList, faFileExport, faChartSimple, faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-peg-menu',
  templateUrl: './peg-menu.component.html',
  styleUrls: ['./peg-menu.component.sass']
})
export class PegMenuComponent {

  faUsers = faUsers;
  faBullseye = faBullseye;
  faHome = faHome;
  faPlus = faPlus;
  faPen = faPen;
  faList = faList;
  faFileExport = faFileExport;
  faChartSimple = faChartSimple;
  faInfo = faInfo;

}
