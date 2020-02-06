import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs';
import {Robot} from '../model/Robots/Robot';
import {StoreService} from "./store.service";
import {User} from "../model/User/User";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private readonly userURL: string;
  public readonly roles = {
    ROLE_REGULAR_USER: 'Zwykły użytkownik',
    ROLE_SUPER_USER: 'Super użytkownik',
    ROLE_ADMIN: 'Administrator',
    ROLE_SERVICEMAN: 'Serwisant',
    ROLE_ROBOT: 'Robot',
  };


  constructor(private http: HttpClient,
              private store: StoreService) {
    this.userURL = store.baseURL + '/users/';
  }

  public getUser(id: string): Observable<User> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<User>(this.userURL + id, {headers: headers, responseType: 'json'})
  }

  public getAll(): Observable<User[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<User[]>(this.userURL + "all", {headers: headers, responseType: 'json'})
  }

  public save(user: User) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<User>(this.userURL + 'add', user, {headers: headers});
  }

  public delete(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + sessionStorage.getItem('token',)
      })
    };
    return this.http.delete(this.userURL + 'delete/' + user.id, httpOptions);
  }

  public getRoleName(role: string): string {
    return this.roles[role];
  }

  public getRoleFromName(roleName: string): string {
    return Object.keys(this.roles).find(key => this.roles[key] == roleName);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userURL + 'all', {responseType: 'json'})
  }
}
