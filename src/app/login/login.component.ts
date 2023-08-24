import { Component } from '@angular/core';
import { Login } from '../models/login';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service'; 

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

  constructor(
    private router: Router,
    private loginService: LoginService 
  ) {}

  isLoginValid() {
    return (
      //this.loginData.username.includes('@') &&
      //this.loginData.username.length >= 10 &&
      this.loginData.password.length >= 6
    );
  }

  getButtonBackgroundColor() {
    return this.isLoginValid() ? '#464646' : '#C9B133';
  }

  onSubmit() {
    if (this.isLoginValid()) {
      console.log('Login Data:', this.loginData);

      this.loginService.login(this.loginData.username, this.loginData.password).subscribe(
        (response) => {
          console.log('Resposta do servidor:', response);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Erro ao fazer a chamada para o servidor:', error);
        }
      );
    }
  }
}
