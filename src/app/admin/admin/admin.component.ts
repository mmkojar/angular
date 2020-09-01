import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  rolesArray :Array<string> = [];
  hideOnUser = false;
  hideOnAdmin = false;

  constructor(private authService:AuthService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getUserRoles();         
      role.forEach(element => {
        this.rolesArray.push(element.name);     
      });             
      if(this.rolesArray.indexOf("user") !== -1){
        this.hideOnUser = true;        
        this.hideOnAdmin = false;
      } 
      if(this.rolesArray.indexOf("admin") !== -1){
        this.hideOnAdmin = true;
        this.hideOnUser = false;  
      }
    }
  }
}
