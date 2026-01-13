import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../app/auth/auth/auth.service'
import { RouterModule, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../Services/location.service';


@Component({
  selector: 'app-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  email = ''
  userInitial = ''
  constructor(private http: HttpClient, public authService: AuthService, private router: Router, private location: LocationService ) { }
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.email = user.email;
        this.userInitial = user.email.charAt(0).toUpperCase();
      }
    });
  }
  logout() {
    this.authService.isLoggedOut();
    this.router.navigate(['/login']);
  }
  GetCurrentLocation() {
    this.location.getCurrentLocation();
  }
  
  

}
