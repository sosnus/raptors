import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../model/User/User";
import {log} from "util";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url: string;
  private readonly logOutUrl: string;
  private readonly rolesUrl: string;
  redirectURL: string;

  constructor(private http: HttpClient,
              private router: Router) {
    this.url = 'http://localhost:8080/users/';
    this.logOutUrl = 'http://localhost:8080/logout';
    this.rolesUrl = 'http://localhost:8080/roles/';
  }

  public userLoggedIn(): boolean {
    return sessionStorage.getItem('access_token') != null;
  }

  public logOut() {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['login']);
    this.http.get<any>(this.logOutUrl);
  }

  userCanAccessPageWithRoles(roles:string[]){
    const userRolesIds: string[] = JSON.parse(localStorage.getItem('userData')).roles;
    let userRoles : string[];
    userRolesIds.forEach(function(roleId){
      userRoles.push(this.getRoleNameById(roleId))
    });
    return roles != null && userRoles.some((role) => roles.indexOf(role) !== -1);
  }


  public getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.url + 'byEmail/' + email, {responseType: 'json'});
  }

  public getRoleNameById (roleId: string): Observable<String> {
    return this.http.get<String>(this.url  + roleId, {responseType: 'json'});
  }

  public login(email: string, password: string): Observable<boolean> {
    this.router.navigate(['']);
    return this.http.post<boolean>(this.url+"login", {
      email: email,
      password: password
    });
  }
}
