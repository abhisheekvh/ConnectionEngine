import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from '../features/home/home.component';
import { authGuard } from './auth/auth/auth.guard';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth/auth.service';
import { ProfileComponent } from './User/profile/profile.component';

const guestGuard = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.loggedIn()) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};

export const routes: Routes = [

  //  PUBLIC
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [guestGuard] },

  //  PROTECTED
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },

  //  default entry
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  //  fallback
  { path: '**', redirectTo: 'login' }
];
