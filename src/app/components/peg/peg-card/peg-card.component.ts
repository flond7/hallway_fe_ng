import { Component, Input, OnInit } from '@angular/core';
import { faBullseye, faPercent, faUser, faBuilding } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-peg-card',
  templateUrl: './peg-card.component.html',
  styleUrls: ['./peg-card.component.sass']
})
export class PegCardComponent implements OnInit {
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
