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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }),
  };

  createAccess(access:any): Observable<any> {
    let jsonData = JSON.stringify(access);
    return this.httpClient.post<any>(this.basePath+"/api_accessoAtti/access_new", access, this.httpOptions)
  }

  getAccessList(): Observable<any> {
    return this.httpClient.get<any>('http://127.0.0.1:8000/api_accessoAtti/access_list')
  }

  deleteAccess(id:number):Observable<any> {
    return this.httpClient.post<any>(this.basePath+"/api_accessoAtti/access_delete/"+id, this.httpOptions)
  }

  check_AA_Authorization(): string {
    // Retrieve the variable using the service
    let authorized_aa = localStorage.getItem('authorized_aa');
    if (authorized_aa == null) { authorized_aa = 'false'}
    return authorized_aa;
  }

  check_PEG_Authorization(): string | null {
    // Retrieve the variable using the service
    let authorized_aa;
    return authorized_aa = localStorage.getItem('authorized_aa');
  }
  
}
