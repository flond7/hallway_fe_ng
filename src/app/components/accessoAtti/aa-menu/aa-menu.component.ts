import { Component, Input } from '@angular/core';
import { faHome, faPlus, faPen, faList, faFileExport } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-aa-menu',
  templateUrl: './aa-menu.component.html',
  styleUrls: ['./aa-menu.component.sass']
})
export class AaMenuComponent {
  
  @Input() page: string = '';

  faHome = faHome;
  faPlus = faPlus;
  faPen = faPen;
  faList = faList;
  faFileExport = faFileExport;
}
