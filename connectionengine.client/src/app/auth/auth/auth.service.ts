import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  /** Called on app start or refresh */
  isAuthenticated(): Observable<boolean> {
    return this.http.get<{ email?: string }>(
      '/api/auth/authloggeduser',
      { withCredentials: true }
    ).pipe(
      map(res => !!res?.email),
      tap(isAuth => this.loggedIn$.next(isAuth)),
      catchError(() => {
        this.loggedIn$.next(false);
        return of(false);
      })
    );
  }

  /** Read-only observable for UI */
  isLoggedIn$(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  setLoggedIn(): void {
    this.loggedIn$.next(true);
  }

  logout(): Observable<void> {
    this.loggedIn$.next(false);
    return this.http.post<void>(
      '/api/auth/logout',
      {},
      { withCredentials: true }
    );
  }
}
