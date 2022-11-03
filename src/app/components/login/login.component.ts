import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateform';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  //inject FormBuilder
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    //validators which will check if there's an email and/or password inputted
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    //this .auth.login(this.email,this.password);
    //this.email = '',;
    //this.password = '',;
  }

  //check in inspect --> console
  onSubmit() {
    if (this.loginForm.valid) {
      //will send the obj to the database if the inputted data is valid
      console.log(this.loginForm.value);
    } else {
      //throw the error using toaster and with required field (message popup)
      ValidateForm.validateAllFormFields(this.loginForm);
      //alert is the msg popup
      alert('Your form is invalid');
    }
  }
  //validate all form fields is moved to validateform.ts since both loginForm and signupForm uses it (exactly the same)
}
