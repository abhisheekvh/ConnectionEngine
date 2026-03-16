import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth/auth.service'
import { FormsModule } from '@angular/forms';
import { UserCreateDTO } from '../../auth/UserDTO/CreateProfileDTO';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: any;
  errorMsg = '';
  model: any = {}
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
  
  createProfile() {
    const payload : UserCreateDTO={
      name: this.model.name,
      age: this.getAge(this.model.dateOfBirth),
      gender: this.model.gender,
      bio: this.model.bio,
      city: this.model.city,
      country: this.model.country
    };

    console.log(payload.age);

    this.http.post('/api/userprofile/createprofile', payload, {
      withCredentials: true
    }).subscribe({
      next: () => {
        console.log("Profile created");
      },
      error: (err) => {
        console.error("Error creating profile", err);
      }
    });
  }
  getAge(dob: string): number {
      const birthDate = new Date(dob);
      if (isNaN(birthDate.getTime())) {
        return 0; // invalid date
      }
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();

      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      console.log(today.getFullYear() + " ---- " + birthDate.getFullYear());
      return age >= 18 ? age : 0;
  }
  selectedFile: File | null = null;
  OnFieldChangeProfilePhoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log(this.selectedFile)
    }

  }

  }

