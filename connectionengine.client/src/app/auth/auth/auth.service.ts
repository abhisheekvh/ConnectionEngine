import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    return localStorage.getItem('LoggedIn')==='true';
  }
  isLoggedOut():void {
    localStorage.removeItem('LoggedIn')
  }
  setLogin(): void {
    localStorage.setItem('LoggedIn', 'true')
  }

}
