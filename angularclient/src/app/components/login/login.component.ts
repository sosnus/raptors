import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/User/User";
import {stringify} from "querystring";
import {log} from "util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  private loggedUser: Observable<User>;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(isValid => {
      if (isValid) {
        sessionStorage.setItem('token', btoa(this.email + ':' + this.password));
        this.authService.getUserByEmail(this.email).subscribe(userData =>{
          localStorage.setItem('userData', JSON.stringify(userData));
          this.loggedUser = JSON.parse(localStorage.getItem('userData'));
        });
        //alert("Logged")
      } else {
        alert("Authentication failed.")
      }
    });
  }

}
