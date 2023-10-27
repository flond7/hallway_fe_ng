import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { BASE_URL, HTTP_OPTIONS} from '../../constants'
import { tap, catchError, mergeMap } from 'rxjs/operators';


const baseURL = BASE_URL;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authJWToken: string = "";
  private csrfToken: string = "";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    }),
  };

  constructor(private http: HttpClient) {}

  getCSRFToken() {
    return this.http.post(baseURL + 'common/get_csrf_token', this.httpOptions)
  }

  login(username: string, password: string): Observable<any> {
    console.log('login auth service');
    
    // First, get the CSRF token and update the headers
    return this.getCSRFToken().pipe(
      mergeMap((r: any) => {
        console.log('CSRF Token Response:', r);
        this.csrfToken = r.csrf_token;
        document.cookie = 'csrftoken=' + this.csrfToken;
        this.httpOptions.headers = this.httpOptions.headers.set('X-CSRFToken', this.csrfToken);
        console.log(this.httpOptions)
        // Then, send the login request and return the observable
        return this.http.post(baseURL + 'common/user_log', { username, password }, this.httpOptions);
      })
    );
  }
  

   
    //return this.http.post(baseURL + 'accounts/login/', { username, password }, this.httpOptions)
    //return this.http.post(baseURL + 'get_csrf_token/', this.httpOptions)
    
    //this.getCSRFToken()
    // get the crsftoken
    // use the token for the login request

/* 
    return this.http.post(baseURL + 'accounts/login/', { username, password }, this.httpOptions)
      .pipe(
        tap(response => console.log(response)),
        catchError(error => {
          console.error('Error:', error);
          return throwError(error); // Re-throw the error to propagate it to the calling code.
        })
         tap(response => {
          console.log(response);
          const token = response.headers.get('Authorization');
          if (token) {
            this.storeToken(token);
          }
        }) 
      ); */
  

  private storeToken(token: string) {
    // Store the token securely, such as in local storage, session storage, or as an HttpOnly cookie
    this.authJWToken = token;
  }

  getToken(): string {
    // Retrieve the token from storage
    return this.authJWToken;
  }

}