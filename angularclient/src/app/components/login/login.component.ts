import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  login() {
    let url = 'http://localhost:8080/users/login';
    let result = this.http.post(url, {
      email: this.email,
      password: this.password
    }, {responseType: 'text'}).subscribe(isValid => {
      if (isValid) {
        sessionStorage.setItem(
          'token',
          btoa(this.email + ':' + this.password)
        );
        alert("Logged")
      } else {
        alert("Authentication failed.")
      }
    });
  }

}
