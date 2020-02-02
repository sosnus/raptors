import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,
              private router: Router,
              private toast: ToastrService) {
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
        this.toast.success("Zalogowano poprawnie")
      } else {
        this.toast.error("Błąd uwierzytelnienia")
      }
    },error => this.toast.error("Niepoprawne dane logowania")
    );
  }

}
