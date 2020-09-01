import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Roles } from '../../auth/roles';
// import { User } from '../../auth/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
    
  title = 'Edit User Roles';
  getroles:Roles[];
  userForm: FormGroup;
  getusername:string;
  getselectedrole:any=[];
  setselectedroles:any=[];
  rolesArray :Array<string> = [];

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getUserRoles();         
      role.forEach(element => {
        this.rolesArray.push(element.name);     
      });             
      if(this.rolesArray.indexOf("user") !== -1){
        this.router.navigate(['/admin/blogs']);     
      }       
    }

    this.userForm = this.fb.group({
      id: [''],
      isActive: [''],
      // roles: new FormArray([new FormControl()]),
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {

      // const formArray: FormArray = this.userForm.get('roles') as FormArray;
      //  formArray.push(new FormControl(res.data.roles));
      this.authService.getUser(+id).subscribe(
        res => {
            this.getusername = res.data.name;
            // this.getroles = res.roles;
            // this.getselectedrole = res.data.roles;           
             this.userForm.patchValue({
               id: res.data.id,
               isActive: res.data.isActive,
              //  roles: res.data.roles
             })  
          }
      );
    }
  }
  
  //get roles() { return this.userForm.get('roles') as FormArray; }
  
  /*onChange(role:any, isChecked: boolean) {  
    if(isChecked) {
      this.getselectedrole.push(role);
      console.log(this.getselectedrole);
    } else {
      let index = this.getselectedrole.indexOf((role));
      this.getselectedrole.splice(index,1);
    }
  }*/
  
  onSubmit () {
    const formData = new FormData();
    formData.append('isActive', this.userForm.get('isActive').value);
    /*for (var i = 0; i < this.getselectedrole.length; i++) {
      formData.append('roles[]', this.getselectedrole[i]);
    } */  
    const id = this.userForm.get('id').value;
    if (id) {
      this.authService.activate_user(formData, +id).subscribe(
        res => {
          if (res.status === 'success') {
            this.router.navigate(['/admin']);
          }          
        },
        (err : HttpErrorResponse)=>{
          console.log(err);
        }
      );
    }
  }

}
