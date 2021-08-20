import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { confirmPasswordValidation } from 'src/app/common/custom.validator';
import { AuthService } from 'src/app/sevices/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  signUpForm: FormGroup;
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _authService: AuthService
  ) {
    this.signUpForm = this._formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/^([a-zA-Z]+\s)*[a-zA-Z]+$/),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.maxLength(16),
            Validators.pattern(/^([a-zA-Z]+\s)*[a-zA-Z]+$/),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
            ),
          ],
        ],
        confPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validator: confirmPasswordValidation('password', 'confPassword') }
    );
    this._authService.removePreviousUserCredentials();
  }

  get firstName() {
    return this.signUpForm.get('firstName');
  }
  get lastName() {
    return this.signUpForm.get('lastName');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get confPassword() {
    return this.signUpForm.get('confPassword');
  }

  onSubmit() {
    this._authService.signInUser({
      email: this.email?.value,
      password: this.password?.value,
    });
    this._router.navigate(['/home']);
  }
}
