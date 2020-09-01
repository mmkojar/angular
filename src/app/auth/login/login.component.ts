import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { SharedataService } from '../../sharedata.service';
// import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error: {};
  loginError: string;
  user: User;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private sharedataService: SharedataService
  ) { }

  ngOnInit() {
    this.sharedataService.loader = true;
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authService.logout();
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    this.sharedataService.loader = true;
    this.submitted = true;
    this.authService.login(this.email.value, this.password.value).subscribe((data: any) => {
      if (this.authService.isLoggedIn) {
        this.sharedataService.loader = false;
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
        this.router.navigate([redirect]);
      }
    },
      (err: HttpErrorResponse) => {
        this.loginError = err.error.message
        this.sharedataService.loader = false;
      }
    );
  }

}
