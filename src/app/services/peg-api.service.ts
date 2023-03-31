import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

const baseURL = 'http://172.20.34.75/peg-backend';
const djangoUserURL = 'http://127.0.0.1:8000/'; //python3 manage.py runserver

@Injectable({
  providedIn: 'root'
})
export class PegApiService {

  constructor(private httpClient: HttpClient) { }

  getUserList() {
    return this.httpClient.get(`${djangoUserURL}/api_users/user_list`)
  }

  /* findSingleUser(cf:any) {
    return this.httpClient.get(`${baseURL}/user/view/${cf}`)
  }

  createUser(data:any): Observable<any> {
    return this.httpClient.post(`${baseURL}/user/create`, data);
  } */
  
}
