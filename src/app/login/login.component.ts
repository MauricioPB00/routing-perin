import { Component } from '@angular/core';
import { Login } from '../models/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginData: Login = {
    username: '',
    password: ''
  };
  constructor(private router: Router) {}

  isLoginValid() {
    return (
      this.loginData.username.includes('@') &&
      this.loginData.username.length >= 10 &&
      this.loginData.password.length >= 6
    );
  }

  getButtonBackgroundColor() {
    return this.isLoginValid() ? '#464646' : '#C9B133';
  }

  onSubmit() {

    if (this.isLoginValid()) {
      console.log('Login Data:', this.loginData);
      this.router.navigate(['/home']);
      
    }
  }
}
