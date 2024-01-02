import { Component, Input } from '@angular/core';
import { faUsers, faBullseye, faHome, faPlus, faPen, faList, faFileExport, faChartSimple, faInfo } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-utenti-menu',
  templateUrl: './utenti-menu.component.html',
  styleUrls: ['./utenti-menu.component.sass']
})
export class UtentiMenuComponent {

  @Input() page: string = '';

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
