import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BlogService } from '../blog.service';
import { Category } from '../../blogpost/category';
import { AuthService } from '../../auth/auth.service';
declare var $: any;

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {

  constructor(
    private blogService: BlogService,
    private authService: AuthService,
  ) { }

  title = 'Manage Categories';
  categories: Category;
  model = new Category();
  role: string;
  hideOnUser = false;
  hideOnAdmin = false;
  rolesArray: Array<string> = [];

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getUserRoles();
      role.forEach(element => {
        this.rolesArray.push(element.name);
      });
      if (this.rolesArray.indexOf("user") !== -1) {
        this.hideOnUser = true;
        this.hideOnAdmin = false;
        this.getUserCategory();
      }
      if (this.rolesArray.indexOf("admin") !== -1) {
        this.hideOnAdmin = true;
        this.hideOnUser = false;
        this.getCategory();
      }
    }

  }

  getCategory() {
    this.blogService.getCategory().subscribe(
      (data: Category) => {
        if (data.status == 'success') {
          this.categories = data.data
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.statusText)
      }
    );
  }

  getUserCategory() {
    this.blogService.getUserCategory().subscribe(
      (data: Category) => {
        if (data.status == 'success') {
          this.categories = data.data
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.statusText)
      }
    );
  }

  onSubmit() {
    return this.blogService.addCategory(this.model).subscribe(
      (data: Category) => {
        if (data.status == 'success') {
          this.getCategory();
          this.model.category_name = '';
          $("#exampleModal").modal('hide');
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.statusText)
      }
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete')) {
      this.blogService.deleteCategory(+id).subscribe(
        res => {
          this.ngOnInit();
        },
        (err: HttpErrorResponse) => {
          console.log(err.statusText)
        }
      );
    }
  }


}
