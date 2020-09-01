import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Page } from './page';
import { Contact } from './contact';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CmspageService {

  serverUrl = 'https://test.thefutureworkplaces.com/api/post/';
  errorData: {};

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getPages(slug: string) {
    return this.http.get<Page>(this.serverUrl + 'pages/' + slug).pipe(
      catchError(this.handleError)
    );
  }

  contactForm(formdata: Contact) {
    return this.http.post<Contact>(this.serverUrl + 'contact', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    )
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
