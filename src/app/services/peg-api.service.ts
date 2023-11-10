import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BASE_URL } from '../../constants';
import { PegPerson, PegOffice } from '../../interfaces';

const baseURL = BASE_URL;

//const djangoUserURL = 'http://127.0.0.1:8000/'; //python3 manage.py runserver

@Injectable({
  providedIn: 'root'
})
export class PegApiService {

  // User list accessable from everywhere
  private userListSubject: BehaviorSubject<any[]> = new BehaviorSubject<PegPerson[]>([]);
  public userListData$: Observable<PegPerson[]> = this.userListSubject.asObservable();

  // PO list accessable from everywhere
  private managerListSubject: BehaviorSubject<any[]> = new BehaviorSubject<PegPerson[]>([]);
  public managerListData$: Observable<PegPerson[]> = this.managerListSubject.asObservable();

  // Office list accessable from everywhere
  private officeListSubject: BehaviorSubject<any[]> = new BehaviorSubject<PegOffice[]>([]);
  public officeListData$: Observable<PegOffice[]> = this.officeListSubject.asObservable();


  constructor(private httpClient: HttpClient) {
    this.getUserList().subscribe(userList => {
      this.userListSubject.next(userList.data);
    });

    this.getOfficeList().subscribe(officeList => {
      this.officeListSubject.next(officeList.data);
    });

    this.getPoList().subscribe(managerList => {
      this.managerListSubject.next(managerList.data);
    });

    
  }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }),
  };


  getOfficeList(): Observable<any>{
    return this.httpClient.get(baseURL + 'api_user/paoffice_list')
  }

  getUserList(): Observable<any> {
    return this.httpClient.get(baseURL + 'api_user/pauser_list_peg')
  }

  getPoList(): Observable<any> {
    return this.httpClient.get(baseURL + 'api_user/pauser_po_list_peg')
  }

  getConstants(): Observable<any> {
    return this.httpClient.get(baseURL + 'api_user/user_constants_list')
  }

  createGoals(goals: any): Observable<any> {
    /* let jsonData = JSON.stringify(goals);
    console.log(jsonData); */
    return this.httpClient.post(baseURL + 'api_peg/create_multiple_goals', goals, this.httpOptions)
  }
  deleteGoals(goal_ids: any): Observable<any> {
    return this.httpClient.delete(baseURL + 'api_peg/delete_multiple_goals', {body: goal_ids, ...this.httpOptions})
  }
  updateGoals(goals: any): Observable<any> {
    return this.httpClient.put(baseURL + 'api_peg/update_multiple_goals', goals, this.httpOptions)
  }
  getReportPerson(data: any): Observable<any> {
    return this.httpClient.post(baseURL + 'api_peg/get_person_results', data, this.httpOptions)
  }

  getReportPo(data: any): Observable<any> {
    return this.httpClient.post(baseURL + 'api_peg/get_po_results', data, this.httpOptions)
  }
  
  getReportOffice(data: any): Observable<any> {
    return this.httpClient.post(baseURL + 'api_peg/get_office_results', data, this.httpOptions)
  }

  getGoalNumbers(data: any): Observable<any> {
    return this.httpClient.post(baseURL + 'api_peg/get_goals_numbers', data, this.httpOptions)
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
