import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateform';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  //patterns for the inputs
  fnamePtn = "[a-z A-Z '-' s]*";
  lnamePtn = "[a-z A-Z '-' s]*";
  emailPtn = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  constructor(private fb: FormBuilder) {}
  //for signup validation
  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        fname: ['', Validators.required],
        lname: ['', Validators.required],
        email: ['', Validators.required],
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmpassword: ['', Validators.required],
      },
      {
        validators: this.MustMatch('password', 'confirmpassword'),
      }
    );
  }
  //parameter denoting password
  MustMatch(formControlName: string, matchingControlName: string) {
    return (signupForm: FormGroup) => {
      const control = signupForm.controls[formControlName];

      //all control properties are stored in matchingControlName
      const matchingControl = signupForm.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['MustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  //check in inspect --> console
  onSignup() {
    if (this.signupForm.valid) {
      //will send the obj to the database if the inputted data is valid
      //performs logic on signup

      console.log(this.signupForm.value);
    } else {
      //throw the error using toaster and with required field (message popup)
      //logic for the throwing error

      ValidateForm.validateAllFormFields(this.signupForm);
      //alert is the msg popup
      alert('Please fill in the required information');
    }
  }
  //validate all form fields is moved to validateform.ts since both loginForm and signupForm uses it (exactly the same)
}
