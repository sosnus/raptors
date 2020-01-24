import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/users/';
  }

  public login(email: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(this.url+"login", {
      email: email,
      password: password
    });
  }
}
