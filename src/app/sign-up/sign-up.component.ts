import { Component } from '@angular/core';
import { AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators, ɵFormGroupRawValue,
  ɵGetProperty,
  ɵTypedOrUntyped } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  
  name: string = ""
  lastName: string= ""
  email: string = ""
  phoneNumber: number = 0
  password: string = ""
  confPassword: string = ""
  form: FormGroup = this.initForm();

  constructor(private fb: FormBuilder, private router: Router) {}

  initForm() {

    let form = this.fb.group({
      name: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      phoneNumber: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      confPassword: this.fb.control('', Validators.required)
    });
    form.addValidators(this.matchValidator(form.get('password'), form.get('confPassword')));
    return form;
  }

  matchValidator(
    control: AbstractControl<ɵGetProperty<ɵTypedOrUntyped<any, ɵFormGroupRawValue<any>, any>, "password">> | null,
    controlTwo: AbstractControl<ɵGetProperty<ɵTypedOrUntyped<any, ɵFormGroupRawValue<any>, any>, "confPassword">> | null
  ): ValidatorFn {
    return () => {
      if (control?.value !== controlTwo?.value)
        return { match_error: 'Passwords do not match' };
      return null;
    };
  }

  
  isEnabled(){

    if(this.form.valid){
      console.log("data has been set")
      console.log(this.form.value)
      this.router.navigate(['dashboard'])
    }else if(this.form.invalid){
      console.log("Has not not been set")
    }
  }
}
