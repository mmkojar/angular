import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BlogService } from '../blog.service';
import { Category } from '../../blogpost/category';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  role: string;
  hideOnUser = false;
  hideOnAdmin = false;
  blogForm: FormGroup;
  categories: Category;
  rolesArray: Array<string> = [];

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

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

    this.blogService.getCategory().subscribe(
      (data: Category) => this.categories = data.data,
    )

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.blogService.getBlogsUserById(+id).subscribe(
        res => {
          this.blogForm.patchValue({
            title: res[0].title,
            body: res[0].body,
            is_featured: res[0].is_featured,
            is_active: res[0].is_active,
            id: res[0].id,
            category: res[0].category_id
          });
          this.pageTitle = 'Edit Blog';
          this.imagePath = res[0].cover_image;
        }
      );
    } else {
      this.pageTitle = 'Create Blog';
    }

    this.blogForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      body: ['', Validators.required],
      category: ['', Validators.required],
      is_featured: [''],
      is_active: [''],
      cover_image: [''],
    });

  }

  get title() { return this.blogForm.get('title'); }
  get body() { return this.blogForm.get('body'); }
  get category() { return this.blogForm.get('category'); }


  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.blogForm.get('cover_image').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.blogForm.get('title').value);
    formData.append('body', this.blogForm.get('body').value);
    formData.append('is_featured', this.blogForm.get('is_featured').value);
    formData.append('is_active', this.blogForm.get('is_active').value);
    formData.append('cover_image', this.blogForm.get('cover_image').value);
    formData.append('category_id', this.blogForm.get('category').value);

    const id = this.blogForm.get('id').value;

    if (id) {
      this.blogService.updateBlog(+id, formData).subscribe(
        res => {
          if (res.status === 'success') {
            alert(res.message);
            this.router.navigate(['/admin/blogs']);
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
    } else {
      this.blogService.createBlog(formData).subscribe(
        res => {
          if (res.status === 'success') {
            alert(res.message);
            this.router.navigate(['/admin/blogs']);
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
    }
  }
}
