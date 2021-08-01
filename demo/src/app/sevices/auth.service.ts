import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router : Router) { }

  isLoggedIn() : boolean{
    console.log(JSON.parse(localStorage.getItem('email')!))
  return localStorage.getItem('email') != null; 
  }

  routeUser() : void {
    if(localStorage.getItem('email')){
      this._router.navigate(['/home'])
    }
      else{
        alert('Invalid Credentials');
        this._router.navigate(['/login'])
      }
  }
  signInUser(email : string) : void {
    localStorage.setItem('email',JSON.stringify(email));
  }

  removePreviousUserCredentials() : void {
    localStorage.removeItem('email');
  }

  routeToDefaultView() : void {
    this._router.navigate(['/login'])
  }

  routeToHome() : void {
    this._router.navigate(['/home'])
  }
}
