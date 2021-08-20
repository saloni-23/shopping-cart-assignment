import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userLoggedInStatus = new BehaviorSubject<string | null>(null);
  constructor(private readonly _router: Router) {}

  isLoggedIn(): Observable<string | null> {
    if (!this.userLoggedInStatus.value && localStorage.getItem('userStatus')) {
      this.setUserLoggedInStatus(
        JSON.parse(localStorage.getItem('userStatus')!)
      );
    }
    return this.userLoggedInStatus.asObservable();
  }

  signInUser(userData: { email: string; password: string }): void {
    localStorage.setItem('email', JSON.stringify(userData.email));
    localStorage.setItem('password', JSON.stringify(userData.password));
    this.setUserLoggedInStatus(JSON.parse(localStorage.getItem('email')!));
  }
  setUserLoggedInStatus(status: string | null) {
    localStorage.setItem('userStatus', JSON.stringify(status));
    this.userLoggedInStatus.next(status);
  }
  removePreviousUserCredentials(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('userStatus');
    this.setUserLoggedInStatus(null);
  }

  routeToDefaultView(): void {
    this._router.navigate(['/login']);
  }

  routeToHome(): void {
    this._router.navigate(['/home']);
  }
}
