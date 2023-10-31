import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { BASE_URL, HTTP_OPTIONS } from '../../constants'
import { tap, catchError, mergeMap, switchMap, map } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';


const baseURL = BASE_URL;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authJWToken: string = "";
  private csrfToken: string = "";


  constructor(private http: HttpClient, private cookieService: CookieService) { }
  /* 
    getCookie(name: string): string | null {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        const cookieValue = parts.pop()?.split(';').shift();
        return cookieValue || null; // Return null if the cookie value is falsy
      }
      return null; // Return null if the cookie is not found
    }
   */

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      //'X-CSRFToken': this.csrfToken, // Access csrfToken within the object's properties.
    }),
  };

  /* getCSRFToken(): Observable<any> {
    const cookieValue = this.cookieService.get('csrftoken');
    console.log(cookieValue);
    return this.http.post(baseURL + 'common/get_csrf_token', this.httpOptions)
  }
 */

/* 
  getCSRFToken(): Observable<string> {
    return this.http.get<string>(baseURL + 'common/get_csrf_token',  { withCredentials: true }).pipe(
      switchMap(r => {console.log(r))}
    )
  }
 */
  getCSRFToken(): Observable<string> {
    return this.http.get<string>(baseURL + 'common/get_csrf_token', { withCredentials: true }).pipe(
      map(response => {
        //const csrfToken = response.csrftoken; // Adjust this to match your API response structure
        //console.log('CSRF token:', csrfToken);
        console.log(response)
        return response;
      })
    );
  }
  

  login(username: string, password: string): Observable<any> {
    // Get the CSRF token from the cookie
    const csrfToken = this.cookieService.get('csrftoken');
    console.log(csrfToken);

    console.log(document.cookie.split(';'))
      
  
    






  
    // Prepare the data for the login request
    const loginData = {
      username: username,
      password: password,
      csrfmiddlewaretoken: csrfToken // Include the CSRF token in the request
    };
  
    // Send the POST request for login
    return this.http.post(baseURL + 'common/user_log', { username, password }, this.httpOptions)
  }
  

 /*  getCSRFToken(): Observable<string> {
    return this.http.get(baseURL + 'common/get_csrf_token', {}, this.httpOptions).pipe(
      switchMap((response: any) => {
        if (response && response.csrf_token) {
          return of(response.csrf_token); // Return the CSRF token as an observable
        }
        return of('default_csrf_token'); // You can provide a default token or handle errors as needed
      })
    );
  } */





  /* login(username: string, password: string): Observable<any> {
    console.log('login auth service');
    return this.getCSRFToken().pipe(
      switchMap((response: any) => {
        //const cookieValue = this.cookieService.get('csrftoken');
        //console.log('cookie'+cookieValue);
        console.log('rrivato')
        return of('cookieValue')
        // Now you can use the CSRF token (csrfToken) and the cookie (cookieValue) here
        // Perform your login logic
        // Example: return this.http.post(loginUrl, { username, password, csrfToken });
      })
    );
  } */





  // Return the merged observable
  /* return this.getCSRFToken().pipe(
  mergeMap((r: any) => {
    this.httpOptions.headers = this.httpOptions.headers.set('X-CSRFToken', r.csrf_token);
    console.log(this.httpOptions);
    console.log(r.csrf_token);
    return r */
  // Send the login request and return the observable
  /* return this.http.post(baseURL + 'common/user_log', { username, password }, this.httpOptions)
    .pipe(
      tap(response => console.log(response)),
      catchError(error => {
        console.error('Error:', error);
        return throwError(error); // Re-throw the error to propagate it to the calling code.
      }),
    );  */
  /*     })
    );
    } */





  getAuthorizations(pk: number): Observable<any> {
    return this.http.get(baseURL + 'common/get_user_profiles_auth/' + pk, this.httpOptions)
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