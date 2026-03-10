import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private loggedin = signal(false);

  constructor(private http: HttpClient) { }

  /** Called on app start or refresh */
  isAuthenticated(){
    return this.http.get<{ email?: string }>(
      '/api/auth/authloggeduser',
      { withCredentials: true }
    ).subscribe(res => {
      this.loggedin.set(!!res?.email)
    });
  }

  /** Read-only observable for UI */
  isLoggedIn() {
  return this.loggedin;
  }

  setLoggedIn(): void {
    this.loggedin.set(true);
  }

  logout(): Observable<void> {
    this.loggedin.set(false);
    return this.http.post<void>(
      '/api/auth/logout',
      {},
      { withCredentials: true }
    );
  }
}
