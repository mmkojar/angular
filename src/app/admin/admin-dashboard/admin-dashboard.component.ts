import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../auth/user';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  title = 'Manage Users';
  AllUsers: User;
  rolesArray: Array<string> = [];
  // hideOnUser = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

    if (this.authService.isLoggedIn()) {
      const role = this.authService.getUserRoles();
      role.forEach(element => {
        this.rolesArray.push(element.name);
      });
      if (this.rolesArray.indexOf("user") !== -1) {
        // this.hideOnUser = true;
        this.router.navigate(['/admin/blogs']);
      }
    }

    this.authService.getAllUsers().subscribe(
      (data: User) => this.AllUsers = data.data,
      (err: HttpErrorResponse) => {
        console.log(err.statusText)
      }
    );
  }

}
