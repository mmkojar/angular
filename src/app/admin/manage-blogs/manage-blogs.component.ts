import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BlogService } from '../blog.service';
import { Adminblog } from '../../auth/adminblog';
import { AuthService } from '../../auth/auth.service';
import { SharedataService } from '../../sharedata.service';

@Component({
  selector: 'app-manage-blogs',
  templateUrl: './manage-blogs.component.html',
  styleUrls: ['./manage-blogs.component.css']
})
export class ManageBlogsComponent implements OnInit {

  title = 'Manage Blogs';
  adminblogId: Adminblog;
  adminblog: Adminblog;
  error: {};
  role: string;
  hideOnUser = false;
  hideOnAdmin = false;
  rolesArray: Array<string> = [];

  constructor(
    private blogService: BlogService,
    private authService: AuthService,
    private sharedataService: SharedataService
  ) { }

  ngOnInit() {
    this.sharedataService.loader = true;
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getUserRoles();
      role.forEach(element => {
        this.rolesArray.push(element.name);
      });
      if (this.rolesArray.indexOf("user") !== -1) {
        this.hideOnUser = true;
        this.hideOnAdmin = false;
        this.blogService.getBlogsByUser().subscribe(
          (data: Adminblog) => {
            if (data.status == 'success') {
              this.sharedataService.loader = false;
              this.adminblogId = data.data
            }
          },
          (err: HttpErrorResponse) => {
            console.log(err.statusText)
          }
        );
      }
      if (this.rolesArray.indexOf("admin") !== -1) {
        this.hideOnAdmin = true;
        this.hideOnUser = false;
        this.blogService.getAllBlogs().subscribe(
          (data: Adminblog) => {
            if (data.status == 'success') {
              this.sharedataService.loader = false;
              this.adminblog = data.data
            }
          },
          (err: HttpErrorResponse) => {
            console.log(err.statusText)
          }
        );
      }
    }
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.blogService.deleteBlog(+id).subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        (err: HttpErrorResponse) => {
          console.log(err.statusText)
        }
      );
    }
  }

}
