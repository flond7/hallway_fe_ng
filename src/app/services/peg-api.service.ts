import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

const baseURL = 'http://172.20.34.75/peg-backend';

@Injectable({
  providedIn: 'root'
})
export class PegApiService {

  constructor(private httpClient: HttpClient) { }

  /* findSingleUser(cf:any) {
    return this.httpClient.get(`${baseURL}/user/view/${cf}`)
  }

  createUser(data:any): Observable<any> {
    return this.httpClient.post(`${baseURL}/user/create`, data);
  } */
  
}
