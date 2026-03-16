import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LoginDTO } from '../UserDTO/LoginDTO';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent
{
  loginDto: LoginDTO = {
    email: '',
    password: '',
    otp: ''
  };
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  login(): void {

    this.http.post(
      '/api/auth/login',
      this.loginDto,
      { withCredentials: true }
    ).subscribe({

      next: () => {

        // update login state
        this.authService.setLoggedIn();

        // navigate
        this.router.navigate(['/home']);

        // reset form
        this.loginDto = {
          email: '',
          password: '',
          otp: ''
        };

      },

      error: err => alert(err.error)

    });

  }

  Signup(): void {
    this.router.navigate(['/signup']);
  }
}
