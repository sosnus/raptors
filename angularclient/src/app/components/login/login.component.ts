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
  private loggedUser: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    let userRoles : string[];

    this.authService.login(this.email, this.password).subscribe(isValid => {
      if (isValid) {
        sessionStorage.setItem('access_token', btoa(this.email + ':' + this.password));

        this.authService.getUserByEmail(this.email).subscribe(
          userData => {
            userData.roles.forEach(function(roleId){
              userRoles.push(this.getRoleNameById(roleId));
            });
            userData.roles=[];
            userRoles.forEach(function(roleName){
              userData.roles.push(roleName);
          });

            localStorage.setItem('userData', JSON.stringify(userData));
            this.loggedUser = JSON.parse(localStorage.getItem('userData'));
          },
          errorData => {
          }
        );
        alert("Logged")
      } else {
        alert("Authentication failed.")
      }
    });
  }

}
