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
    
    //retrieve single apps authorization
    //let userid = 2;
    
/*     this.getAuthorizations(userid).subscribe(r=> {
      // Save variables to local storage
      Object.keys(r.data).forEach(key => {
        const value = r.data[key];
        localStorage.setItem(key, JSON.stringify(value));
      });
    }); */
    
    // First, get the CSRF token and update the headers
    return this.getCSRFToken().pipe(
      mergeMap((r: any) => {
        //console.log('CSRF Token Response:', r);
        this.csrfToken = r.csrf_token;
        document.cookie = 'csrftoken=' + this.csrfToken;
        this.httpOptions.headers = this.httpOptions.headers.set('X-CSRFToken', this.csrfToken);
        // Then, send the login request and return the observable
        return this.http.post(baseURL + 'common/user_log', { username, password }, this.httpOptions).pipe(

          catchError((error: any) => {
            // Handle the error here, and optionally, log it
            //console.error('Login failed:', error);
            // You can also customize the error message or response before re-throwing it
            return throwError(() => error);    
          })
        );
      })
    );
  }
  
  getAuthorizations(pk:number): Observable<any> {
    return this.http.get(baseURL + 'common/get_user_profiles_auth/'+pk, this.httpOptions)
  }

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