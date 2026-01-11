import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  constructor(private http: HttpClient,) { }

  setUser(user: any) {
    this.userSubject.next(user);
  }
  isLoggedIn(): boolean {

    return !!this.userSubject.value;
  }
  isLoggedOut()
  {
    localStorage.removeItem('LoggedIn')
    return this.http.post(
      '/api/auth/logout',
      {},
      { withCredentials: true }
    ).subscribe({
      next: () => {
        this.userSubject.next(null);
      }, error: err => alert(err.error)
    });
  }
  setLogin(): void {
    localStorage.setItem('LoggedIn', 'true')
  }
  getUser() {
    return this.userSubject.value;
  }



}
