import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { QRCodeComponent } from 'angularx-qrcode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, QRCodeComponent],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  email = '';
  password = '';

  qrText: string | null = null;
  sharedKey: string | null = null;
  showQr = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register() {
    this.http.post(
      '/api/auth/register',
      {
        email: this.email,
        password: this.password
      },
      { responseType: 'text' }
    ).subscribe({
      next: () => this.generateQrCode(),
      error: () => alert('Signup failed')
    });
  }

  generateQrCode() {
    this.http.get<any>(
      `/api/auth/2fa/setup?email=${encodeURIComponent(this.email)}`
    ).subscribe({
      next: res => {
        this.qrText = res.qrText;
        this.sharedKey = res.sharedKey;
        this.showQr = true;
      },
      error: () => alert('Failed to generate QR code')
    });
  }

  Login() {
    this.router.navigate(['/login']);
  }
}
