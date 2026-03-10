import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { QRCodeComponent } from 'angularx-qrcode';
import { Router } from '@angular/router';
import { signupDTO } from '../UserDTO/SignupDTO'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, QRCodeComponent],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupDto: signupDTO = {
    email: '',
    password: '',
    qrText: null,
    sharedKey: null,
    showQr: false
  };
  

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register() {
    this.http.post(
      '/api/auth/register',
      this.signupDto,
      { responseType: 'text' }
    ).subscribe({
      next: () => this.generateQrCode(),
      error: () => alert('Signup failed')
    });
  }

  generateQrCode() {
    this.http.get<any>(
      `/api/auth/2fa/setup?email=${encodeURIComponent(this.signupDto.email)}`
    ).subscribe({
      next: res => {
        this.signupDto.qrText = res.qrText;
        this.signupDto.sharedKey = res.sharedKey;
        this.signupDto.showQr = true;
      },
      error: () => alert('Failed to generate QR code')
    });
  }

  Login() {
    this.router.navigate(['/login']);
  }
}
