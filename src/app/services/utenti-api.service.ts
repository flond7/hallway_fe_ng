import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BASE_URL } from '../../constants';
import { PegPerson, PegOffice, PegPoOffice } from '../../interfaces';

const baseURL = BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class UtentiApiService {

  // User list accessable from everywhere
  /* private userListSubject: BehaviorSubject<any[]> = new BehaviorSubject<PegPerson[]>([]);
  public userListData$: Observable<PegPerson[]> = this.userListSubject.asObservable(); */

  constructor(private httpClient: HttpClient) {

    /* this.getUserList().subscribe(userList => {
      this.userListSubject.next(userList.data);
    }); */

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }),
  };


  /* getUserList(): Observable<any> {
    return this.httpClient.get(baseURL + 'api_user/pauser_list_peg')
  } */

  getUserCredentials(user: any): Observable<any> {
    console.log(user)
    const data = { id: user.id }
    return this.httpClient.post(baseURL + 'api_user/user_pacredential', data, this.httpOptions)
  }

  getListUserCredentials(): Observable<any> {
    return this.httpClient.get(baseURL + 'api_user/user_list_pacredential', this.httpOptions)
  }



}
