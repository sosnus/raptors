import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/User/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }


  login() {
    this.authService.login(this.email, this.password).subscribe(rolesNames => {
      if (rolesNames!==null) {
        sessionStorage.setItem('token', btoa(this.email + ':' + this.password));
        localStorage.setItem('userData', btoa(JSON.stringify(rolesNames)));
        this.router.navigate(['']);
        //alert("Logged");
      } else {
        alert("Authentication failed.")
      }
    });
  }

}
