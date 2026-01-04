import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient) { }

  register() {

    console.log('Registering user:', this.email)


    this.http.post('/api/auth/register', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: res => {
        alert('Signup successful. Setup 2FA.');
        console.log(res);
      },
      error: err => {
        console.error(err);
        alert(
          err?.error?.[0]?.description ||
          err?.error ||
          'Signup failed'
        );
      }
    });
  }
}
