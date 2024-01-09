import { Component } from '@angular/core';

@Component({
  selector: 'app-u-list',
  templateUrl: './u-list.component.html',
  styleUrls: ['./u-list.component.sass']
})
export class UListComponent {


  constructor() { }

  getUserList() {
    console.log('userlist')
  }

}
