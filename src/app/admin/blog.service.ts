import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Adminblog } from '../auth/adminblog';
import { Category } from '../blogpost/category';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  serverUrl = 'http://127.0.0.1:8000/api/post/';

  constructor(private http: HttpClient) { }

  getBlogsByUser() {
    return this.http.get<Adminblog>(this.serverUrl + 'getBlogsByUser');
  }

  getBlogsUserById(id: number) {
    return this.http.get<Adminblog>(this.serverUrl + 'getBlogsById/' + id);
  }

  getAllBlogs() {
    return this.http.get<Adminblog>(this.serverUrl + 'getAllBlogs');
  }

  createBlog(blog) {
    return this.http.post<any>(this.serverUrl + 'create', blog)
  }

  updateBlog(id: number, blog: any) {
    return this.http.post<any>(this.serverUrl + 'edit_angular/' + id, blog)
  }

  deleteBlog(id: number) {
    return this.http.delete(this.serverUrl + 'delete/' + id)
  }

  getCategory() {
    return this.http.get(this.serverUrl + 'getcategory')
  }

  getUserCategory() {
    return this.http.get(this.serverUrl + 'getUsercategory')
  }

  addCategory(formdata: Category) {
    return this.http.post(this.serverUrl + 'addcategory', formdata)
  }

  deleteCategory(id: number) {
    return this.http.delete(this.serverUrl + 'deletecategory/' + id)
  }

  // getRoles(){
  //   return this.http.get<Adminblog>('http://127.0.0.1:8000/api/login/roles');
  // } 
}
