import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthService } from '../../auth/auth/auth.service'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userInitial = ''
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  errorMsg = ''
  constructor(private http: HttpClient, private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.loadUser();
    //this.GetUserLocation();
  }
  loadUser() {
    this.http.get<any>(
      '/api/member/profile',
      { withCredentials: true }
    ).subscribe({
      next: user => {
        console.log('User profile:', user.email);
        this.authService.setUser(user);
      },
      error: err => {
        console.error(err);
        if (err.status == 401) {
          this.router.navigate(['/login']);
        }
        else
          alert('Failed to load user profile');
      }
    });
  }

}
