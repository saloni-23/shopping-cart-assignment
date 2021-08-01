import {FormGroup} from '@angular/forms';

export function confirmPasswordValidation(password: string,confPassword: string){
    return (formGroup: FormGroup) => {
      const pwd = formGroup.controls[password];
      const confPwd = formGroup.controls[confPassword];
      if (confPwd.errors && !confPwd.errors.confirmPasswordValidation) {
          return;
      }
      if (pwd.value !== confPwd.value) {
          confPwd.setErrors({ confirmPasswordValidation: true });
      } else {
          confPwd.setErrors(null);
      }
  }
  }