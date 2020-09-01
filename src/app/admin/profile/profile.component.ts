import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../../auth/user';
import { SharedataService } from '../../sharedata.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userForm: FormGroup;

  error: {};
  responsemsg: string;
  showMsg = false;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private sharedataService: SharedataService
  ) { }

  ngOnInit() {
    this.sharedataService.loader = true;

    this.userForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: [''],
    });

    this.authService.getloginuser().subscribe(
      (res: User) => {
        // if (res.status == 'success') {
        this.sharedataService.loader = false;
        this.userForm.patchValue({
          id: res.id,
          name: res.name,
          email: res.email,
          phone: res.phone,
        });
        // }
      },
      error => this.error = error,
    );
  }

  get name() { return this.userForm.get('name'); }
  get email() { return this.userForm.get('email'); }
  get phone() { return this.userForm.get('phone'); }


  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.userForm.get('name').value);
    formData.append('email', this.userForm.get('email').value);
    formData.append('phone', this.userForm.get('phone').value);
    formData.append('password', this.userForm.get('password').value);

    const id = this.userForm.get('id').value;

    if (id) {
      this.authService.updateUser(formData).subscribe(
        res => {
          if (res.status === 'success') {
            this.responsemsg = res.message;
            this.showMsg = true;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
    }
  }
}
