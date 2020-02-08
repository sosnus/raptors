import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../model/User/User";
import {StoreService} from "./store.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url: string;
  private readonly logOutUrl: string;
  redirectURL: string;

  constructor(private http: HttpClient,
              private router: Router,
              private store: StoreService) {
    this.url = store.baseURL+'/users/';
    this.logOutUrl = store.baseURL+'/logout';
  }

  public userLoggedIn(): boolean {
    return sessionStorage.getItem('token') != null && localStorage.getItem("userData") != null;
  }

  public logOut() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.removeItem('userID');
    this.router.navigate(['login']);
    this.http.get<any>(this.logOutUrl);
  }

  public currentUserRoles() {
    if (!this.userLoggedIn()) return;
    return JSON.parse(atob(localStorage.getItem('userData')));
  }

  public isAdmin() {
    return this.currentUserRoles().includes("ROLE_ADMIN");
  }

  public isServiceman() {
    return this.currentUserRoles().includes("ROLE_SERVICEMAN");
  }

  public isSuperUser() {
    return this.currentUserRoles().includes("ROLE_SUPER_USER");
  }

  public isRegularUser() {
    return this.currentUserRoles().includes("ROLE_REGULAR_USER");
  }

  userCanAccessPageWithRoles(roles: string[]) {
    const userRoles: string[] = JSON.parse(atob(localStorage.getItem('userData')));
    return roles != null && userRoles.some((role) => roles.indexOf(role) !== -1);
  }



  public login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.url + "login", {
      email: email,
      password: password
    });
  }
}
