import { Component, Input, OnInit } from '@angular/core';
import { faBullseye, faPercent, faUser, faBuilding } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-peg-card-horizontal',
  templateUrl: './peg-card-horizontal.component.html',
  styleUrls: ['./peg-card-horizontal.component.sass']
})
export class PegCardHorizontalComponent {

  @Input() title: string = '';
  @Input() number: number = 0;
  @Input() icon: string = '';
  @Input() bgcolor: string = '';
  @Input() textcolor: string = '';

  faPercent = faPercent; faBullseye = faBullseye; faUser = faUser; faBuilding = faBuilding;

  constructor() { }

  ngOnInit(): void {
  }

}
