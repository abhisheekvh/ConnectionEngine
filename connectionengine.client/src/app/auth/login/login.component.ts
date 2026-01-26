import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';
  otp = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  login(): void {
    this.http.post(
      '/api/auth/login',
      {
        email: this.email,
        password: this.password,
        otp: this.otp
      },
      { withCredentials: true }
    ).subscribe({
      next: () => {
        this.authService.setLoggedIn();
        this.router.navigate(['/home']);
       
        this.email = '';
        this.password = '';
        this.otp = '';
      },
      error: err => alert(err.error)
    });
  }

  Signup(): void {
    this.router.navigate(['/signup']);
  }
}
