import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

const baseURL = 'http://172.20.34.75/peg-backend';
const djangoUserURL = 'http://127.0.0.1:8000/'; //python3 manage.py runserver

@Injectable({
  providedIn: 'root'
})
export class AccessoAttiApiService {

  constructor(private httpClient: HttpClient) { }

  basePath = 'http://127.0.0.1:8000';

  /*constructor(private http: HttpClient, public AuthService: AuthService) { }
  getOptions() {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.AuthService.getToken()
    if (this.AuthService.token) {
      headers = headers.set('Authorization', `Token ${this.AuthService.token}`);
    }
    return { headers };
  } */

    // Save partial answer
  savePartialAnswer(user: any, answers: any) {
    console.log(user);
    console.log(answers);
  }

  /* getOptions() {
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    }); 
    //headers = headers.append('Authorization','Bearer${this.auth.jwToken}');
    return headers;
  } */

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
  })
  }

  createAccess(access:any): Observable<any> {
    return this.httpClient.post('http://127.0.0.1:8000/api_accessoAtti/access_new', access, this.httpOptions )
  }

  getAccessList(): Observable<any> {
    return this.httpClient.get<any>('http://127.0.0.1:8000/api_accessoAtti/access_list')
  }

  submit() {
    this.createAccess('test');
  }

  /* getRailwayDetail(id: any): Observable<any> {
    return this.http.get<any>(this.basePath + '/railway-detail/' + id, this.getOptions())
  }
 */


  /* findSingleUser(cf:any) {
    return this.httpClient.get(`${baseURL}/user/view/${cf}`)
  }

  createUser(data:any): Observable<any> {
    return this.httpClient.post(`${baseURL}/user/create`, data);
  } */
  
}
