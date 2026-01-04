import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';   
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

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
      next: () => alert('Login successful'),
      error: err => alert(err.error)
    });
  }
}
