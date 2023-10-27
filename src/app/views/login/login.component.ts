import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(r => {
      if (r.status == 201) {
        //redirect to home
        this.router.navigate(['/home']);
      } else {
        //show login error
      }
    }
    );
  }
}