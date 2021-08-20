import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/sevices/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (
      JSON.parse(localStorage.getItem('email')!) == this.email?.value &&
      JSON.parse(localStorage.getItem('password')!) == this.password?.value
    ) {
      this._authService.setUserLoggedInStatus(
        JSON.parse(localStorage.getItem('email')!)
      );
      this._router.navigate(['/home']);
    } else if (
      JSON.parse(localStorage.getItem('email')!) != this.email?.value
    ) {
      alert('User not registered !');
      this.loginForm.reset();
    } else {
      alert('Invalid Password');
      this.password?.reset();
    }
  }
}
