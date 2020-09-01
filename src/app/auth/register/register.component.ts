import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User();
  error: {};
  successmsg = '';
  showMsg = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    return this.authService.registerUser(form.value).subscribe(
      (data: any) => {
        if (data.status == 'success') {
          // this.user = form.value,
          form.reset();
          this.showMsg = true;
          this.successmsg = data.message;
          console.log(data);
          this.router.navigate(['/admin']);
        }
      },
      error => this.error = error
    );
  }

}
