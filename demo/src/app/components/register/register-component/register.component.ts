import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { confirmPasswordValidation } from 'src/app/common/custom.validator';
import { AuthService } from 'src/app/sevices/auth.service';
import { CartService } from 'src/app/sevices/cart.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  signUpForm : FormGroup;
  constructor(private formBuilder: FormBuilder,
              private router : Router,
              private _cartService : CartService,
              private _authService : AuthService) {
    this.signUpForm = this.formBuilder.group({
      firstName : ['',[Validators.required,Validators.minLength(3),  Validators.pattern(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)]],
      lastName :['',[Validators.required,Validators.maxLength(16),  Validators.pattern(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)]],
      email : ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6),Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)]],
      confPassword : ['',[Validators.required,Validators.minLength(6)]]
    },
    {validator: confirmPasswordValidation('password','confPassword') })
  }

  get firstName(){
    return this.signUpForm.get('firstName');
  }
  get lastName(){
    return this.signUpForm.get('lastName');
  }
  get email(){
    return this.signUpForm.get('email');
  }
  get password(){
    return this.signUpForm.get('password');
  }
  get confPassword(){
    return this.signUpForm.get('confPassword');
  }

  
  onSubmit(){
    this._authService.removePreviousUserCredentials();
    this._authService.signInUser(this.signUpForm.get('email')?.value)
    this.router.navigate(['/home']);
  }
}
