import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Handle the response with JWT token
        console.log('JWT Token:', response.token);
      },
      (error) => {
        // Handle authentication error
        console.error('Authentication Error:', error);
      }
    );
  }
}