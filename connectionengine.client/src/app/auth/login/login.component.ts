import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';   
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ProfileComponent } from '../../User/profile/profile.component';

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
    private auth: AuthService
  ) { }
  login() {
    return this.http.post(
      '/api/auth/login',
      {
        email: this.email,
        password: this.password,
        otp: this.otp
      },
      { withCredentials: true }
    ).subscribe({
      next: () => {
        this.auth.setLogin(),
          this.router.navigate(['/profile']);
          this.email = '';
        this.password = '';
        this.otp = '';
      },

      error: err => alert(err.error)
    });
  }
  Signup() {
    this.router.navigate(['/signup']);
  }
}
