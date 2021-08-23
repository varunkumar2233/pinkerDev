import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
//import Validation from './utils/validation';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupSuccess: boolean = true;
  registerForm!: FormGroup;
  submitted = false;

 // loading: boolean;
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
  ) { }

  ngOnInit(): void {

    setTimeout(()=>{                           
      this.signupSuccess = false;
  }, 3000);

  this.registerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
});
}

get f() { return this.registerForm.controls; }

onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.registerForm.invalid) {
      return;
  }

  this.router.navigate(['/main/terms-condition']);
  
}


}
