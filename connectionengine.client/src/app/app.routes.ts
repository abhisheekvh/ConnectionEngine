import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from '../features/home/home.component';
import { authGuard } from './auth/auth/auth.guard';

export const routes: Routes = [

  // 🌐 PUBLIC
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // 🔐 PROTECTED
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },

  // 🔁 default entry
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // ❌ fallback
  { path: '**', redirectTo: 'login' }
];
