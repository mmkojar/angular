import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  rolesArray: Array<string> = [];
  hideOnUser = false;
  hideOnAdmin = false;

  constructor(private titleService: Title, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getUserRoles();
      role.forEach(element => {
        this.rolesArray.push(element.name);
      });
      if (this.rolesArray.indexOf("user") !== -1) {
        this.hideOnUser = true;
        this.hideOnAdmin = false;
      }
      if (this.rolesArray.indexOf("admin") !== -1) {
        this.hideOnAdmin = true;
        this.hideOnUser = false;
      }
    }
  }

  get isLoggedIn() { return this.authService.isLoggedIn(); }
  get getLoginUsername() { return this.authService.getLoginUsername(); }

  setPagetitle(title) {
    this.titleService.setTitle(title);
  }

}
