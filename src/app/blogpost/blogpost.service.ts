import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Blogpost } from './blogpost';
import { Category } from './category';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  serverUrl = 'http://127.0.0.1:8000/api/post/';
  errorData: {};
  constructor(private http: HttpClient) { }


  getPosts() {
    return this.http.get<Blogpost>(this.serverUrl + 'getPosts').pipe(
      catchError(this.handleError)
    );
  }

  getPost(id: number, cat_id?: number) {

    if (cat_id) {
      return this.http.get<Blogpost>(this.serverUrl + 'getsingle/' + id + '/' + cat_id).pipe(
        catchError(this.handleError)
      );
    }
    else {
      return this.http.get<Blogpost>(this.serverUrl + 'getsingle/' + id).pipe(
        catchError(this.handleError)
      );
    }

  }

  getFeaturedPosts() {
    return this.http.get<Blogpost>(this.serverUrl + 'featured').pipe(
      catchError(this.handleError)
    );
  }

  getRecentPosts() {
    return this.http.get<Blogpost>(this.serverUrl + 'recent').pipe(
      catchError(this.handleError)
    );
  }

  getCategories() {
    return this.http.get<Category>(this.serverUrl + 'getcategory').pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }

}
