import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  submitted: boolean;
  signupForm: FormGroup;

  constructor(
    public authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.submitted = false;
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  submit(value: any) {
  this.submitted = true;
  if (!this.signupForm.valid) { return; }

  this.authService.signUp(value.email, value.password, value.document, value.name).subscribe(
    this.authService.redirectAfterLogin.bind(this.authService),
    this.afterFailedSignup.bind(this));
}


  afterFailedSignup(errors: any) {
    let parsed_errors = JSON.parse(errors._body).errors;
    for (let attribute in this.signupForm.controls) {
      if (parsed_errors[attribute]) {
        this.signupForm.controls[attribute].setErrors(parsed_errors[attribute]);
      }
    }
    this.signupForm.setErrors(parsed_errors);
  }
}
