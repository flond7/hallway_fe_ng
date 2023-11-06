import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BASE_URL } from '../../constants';
import { PegPerson } from '../../interfaces';

const baseURL = BASE_URL;

//const djangoUserURL = 'http://127.0.0.1:8000/'; //python3 manage.py runserver

@Injectable({
  providedIn: 'root'
})
export class PegApiService {

  // User list accessable from everywhere
  private userListSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public userListData$: Observable<PegPerson[]> = this.userListSubject.asObservable();

  constructor(private httpClient: HttpClient) { 
    this.getUserList().subscribe(userList => {
      this.userListSubject.next(userList.data);
    });
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }),
  };


  getOfficeList() {
    return this.httpClient.get('http://127.0.0.1:8000/api_user/office_list')
  }

  getUserList():Observable<any> {
    return this.httpClient.get(baseURL + 'api_user/pauser_list_peg')
  }

  getPoList():Observable<any> {
    return this.httpClient.get(baseURL + 'api_user/pauser_po_list_peg')
  }

  getConstants():Observable<any> {
    return this.httpClient.get(baseURL + 'api_user/user_constants_list')
  }

  createGoals(goals: any):Observable<any> {
    /* let jsonData = JSON.stringify(goals);
    console.log(jsonData); */
    return this.httpClient.post(baseURL + 'api_peg/goals_new', goals, this.httpOptions)
  }

  /* findSingleUser(cf:any) {
    return this.httpClient.get(`${baseURL}/user/view/${cf}`)
  }

  createUser(data:any): Observable<any> {
    return this.httpClient.post(`${baseURL}/user/create`, data);
  } */
  
  check_PEG_Authorization(): string | null {
    // Retrieve the variable using the service
    let authorized_peg;
    return authorized_peg = localStorage.getItem('authorized_peg');
  }
}
