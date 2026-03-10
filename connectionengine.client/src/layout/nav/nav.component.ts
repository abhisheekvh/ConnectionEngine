import { HttpClient } from '@angular/common/http';
import { Component, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../app/auth/auth/auth.service';
import { LocationService } from '../../Services/location.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  email = '';
  userInitial = '';
  isLoggedIn=false

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private locationService: LocationService
  ) {
    effect(() => {
      const isAuth = this.authService.isLoggedIn()();
      this.isLoggedIn = isAuth
      if (!isAuth) {
        this.email = '';
        this.userInitial = '';
      }

    }) }

  ngOnInit(): void {
    this.loadUserInfo();
    
   
   
  }

  private loadUserInfo(): void {
    this.http.get<any>(
      '/api/member/profile',
      { withCredentials: true }
    ).subscribe({
      next: user => {
        this.email = user.email;
        this.userInitial = user.email?.charAt(0).toUpperCase();
      },
      error: () => {
        // do nothing — guard handles auth
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      window.location.href = '/login';
    });
  }

  getCurrentLocation(): void {
    this.locationService.getCurrentLocation();
  }
}
