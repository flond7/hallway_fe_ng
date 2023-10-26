import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { AuthService } from './services/auth.service'

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // custom header to eventyally skip interceptor if this voice is true
    console.log('interceptor')
    console.log(request.headers.get('Skip-Interceptor'))
    /* if (request.headers.has('Skip-Interceptor') && request.headers.get('Skip-Interceptor') === 'true') {
      console.log('skip')
      return next.handle(request);
    } */

    // get the JWT token
    const token = this.authService.getToken();

    // get the JWT token
    const csrfToken = this.authService.getCSRFToken().subscribe(r => console.log(r));

    //clone the request and add the CSRF token
    const csrfModifiedRequest = request.clone({
      setHeaders: {
        'X-CSRFToken': csrfToken as unknown as string                //type assertion because TS is expecting a string and receives an object
      }
    });

    return next.handle(csrfModifiedRequest);

  }
}

    /* // Clone the request and add the token to the headers
    const modifiedRequest = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
      }
    }); */

    // Now, get the CSRF token and add it to the headers
    /* return this.authService.getCSRFToken().pipe(
      switchMap(csrfToken => {
        const csrfModifiedRequest = modifiedRequest.clone({
          setHeaders: {
            'X-CSRFToken': csrfToken as string                //type assertion because TS is expecting a string and receives an object
          }
        });
        return next.handle(csrfModifiedRequest);
      })
    ); */



/*   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // get the JWT token
    const token = this.authService.getToken();

    // Clone the request and add the JWT token to the Authorization header
    const modifiedRequest = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Now, get the CSRF token and add it to the headers
    return this.authService.getCSRFToken().pipe(
      switchMap(csrfToken => {
        const csrfModifiedRequest = modifiedRequest.clone({
          setHeaders: {
            'X-CSRFToken': csrfToken
          }
        });
        return next.handle(csrfModifiedRequest);
      })
    );
  }
} */
