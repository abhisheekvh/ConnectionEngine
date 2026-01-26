import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth/auth.service'
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: any;
  errorMsg = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuth => {
      if (isAuth) {
        this.loadUser();
      }
    });
  }

  loadUser() {
    this.http.get<any>(
      '/api/member/profile',
      { withCredentials: true }
    ).subscribe({
      next: user => this.user = user,
      error: err => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else {
          alert('Failed to load profile');
        }
      }
    });
  }
}
