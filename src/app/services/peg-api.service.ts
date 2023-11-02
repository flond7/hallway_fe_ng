import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { BASE_URL } from '../../constants'

const baseURL = BASE_URL;

const djangoUserURL = 'http://127.0.0.1:8000/'; //python3 manage.py runserver

@Injectable({
  providedIn: 'root'
})
export class PegApiService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      //'X-CSRFToken': this.csrfToken, // Access csrfToken within the object's properties.
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
