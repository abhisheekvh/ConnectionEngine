import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,) { }

  isLoggedIn(): boolean {
    return localStorage.getItem('LoggedIn') === 'true';
  }
  isLoggedOut() {
    localStorage.removeItem('LoggedIn')

    return this.http.post(
      '/api/auth/logout',
      {},
      { withCredentials: true }
    ).subscribe({
      next: () => {
        alert('Logged out successfully');
      }, error: err => alert(err.error)
    });
  }

  setLogin(): void {
    localStorage.setItem('LoggedIn', 'true')
  }

}
