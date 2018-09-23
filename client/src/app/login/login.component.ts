import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  hasErrors: boolean = false
  errorMessage: string = ''

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.hasErrors = false;
      this.router.navigateByUrl('/profile');
    }, (err) => {
      this.hasErrors = true;
      this.errorMessage = err.error.message
    }); 
  }
}
