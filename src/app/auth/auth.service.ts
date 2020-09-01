import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Roles } from './roles';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SharedataService } from '../sharedata.service';

// import { Adminblog } from '../auth/adminblog';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl = 'http://127.0.0.1:8000/api/login/';
  errorData: {};

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  redirectUrl: string;

  constructor(
    private http: HttpClient,
    private sharedataService: SharedataService
  ) { }

  registerUser(formdata: User) {

    const body: User = {
      id: formdata.id,
      name: formdata.name,
      email: formdata.email,
      phone: formdata.phone,
      password: formdata.password,
      status: formdata.status
    }
    return this.http.post<User>(this.serverUrl + 'add', body, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  login(email: string, password: string) {
    return this.http.post<any>(this.serverUrl + 'login', { email: email, password: password }).pipe(
      map(user => {
        if (user.data && user.data.token) {
          localStorage.setItem('currentUser', JSON.stringify(user.data));
          localStorage.setItem('UserRole', JSON.stringify(user.roles));
        }
      }),
      // catchError(this.handleError)
    )
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  getLoginUsername() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.name;
  }

  getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.token;
  }

  getUserRoles() {
    const roles = JSON.parse(localStorage.getItem('UserRole'));
    return roles;
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('UserRole');
    this.sharedataService.loader = false;
  }

  getloginuser() {
    return this.http.get<User>(this.serverUrl + 'get')
  }

  updateUser(User) {
    return this.http.post<any>(this.serverUrl + 'edit', User)
  }

  getAllUsers() {
    return this.http.get<User>(this.serverUrl + 'get_users')
  }

  // getAllRoles(){
  //   return this.http.get<Roles>(this.serverUrl + 'getRoles')
  // }

  getUser(id: number) {
    return this.http.get<User>(this.serverUrl + 'getsingle/' + id);
  }

  updateRoles(User, id: number) {
    return this.http.post<any>(this.serverUrl + 'edit/role/' + id, User)
  }

  activate_user(User, id: number) {
    return this.http.post<any>(this.serverUrl + 'activate_user/' + id, User)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error.message}`);
      // this.errorData = {
      //   invalidError:  `${error.error.message}`,
      // }
      // return throwError(this.errorData);
    }
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }

}

