import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { ModalService } from '../../services/modals.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService, public modalService: ModalService, private cookieService: CookieService) { }

  ngOnInit() {
        //ask for CSRF token
    this.authService.getCSRFToken().subscribe(r => {
      console.log('cookie ok')
      const csrfToken = this.cookieService.get('csrf_token');
      console.log(csrfToken);
    })
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (r) => {
        console.log(r)
        if (r.status == 201) {
          this.authService.getAuthorizations(r.userid).subscribe(r => {
            // Save variables to local storage
            Object.keys(r.data).forEach(key => {
              const value = r.data[key];
              localStorage.setItem(key, JSON.stringify(value));
            });
            this.router.navigate(['/home']);
          });;
          //redirect to home
          //this.router.navigate(['/home']);
        }
      },
      (error) => {
        console.log(error);
        let data = "GENERICO: credenziali non valide";
        this.modalService.openFeedbackModal(false, data)
      }
    );
  }


}