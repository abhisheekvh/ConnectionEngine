import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  loggedIn = signal(false);

  constructor(private http: HttpClient) { }

  /** Restore login state after refresh */
  isAuthenticated(): Observable<boolean> {

    return this.http.get<{ email?: string }>(
      '/api/auth/authloggeduser',
      { withCredentials: true }
    ).pipe(

      map(res => !!res?.email),

      tap(isAuth => {
        this.loggedIn.set(isAuth);
        console.log("loggedIn value:", this.loggedIn());
      }),

      catchError(() => {
        this.loggedIn.set(false);
        console.log("loggedIn value:", this.loggedIn());
        return of(false);
      })

    );
  }

  setLoggedIn(): void {
    this.loggedIn.set(true);
  }

  logout(): Observable<void> {

    this.loggedIn.set(false);

    return this.http.post<void>(
      '/api/auth/logout',
      {},
      { withCredentials: true }
    );

  }
}
