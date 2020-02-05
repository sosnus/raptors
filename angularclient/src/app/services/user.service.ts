import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Robot} from '../model/Robots/Robot';
import {StoreService} from "./store.service";
import {User} from "../model/User/User";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private readonly userURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.userURL = store.baseURL + '/accounts/users/';
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userURL + 'all', {responseType: 'json'})
  }
}
