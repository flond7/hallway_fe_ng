import { Component, Input } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-aa-list-row',
  templateUrl: './aa-list-row.component.html',
  styleUrls: ['./aa-list-row.component.sass']
})
export class AaListRowComponent {
  @Input() access: any;
  
  faPen =faPen;

  constructor () {}

  toogle() {
    console.log('toogle')
  }
}
