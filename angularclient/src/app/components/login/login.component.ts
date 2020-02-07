import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {RobotTaskService} from "../../services/robotTask.service";
import {StoreService} from "../../services/store.service";

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
              private toast: ToastrService,
              private robotTaskService: RobotTaskService,
              private storeService: StoreService) {
  }

  ngOnInit() {
  }


  login() {
    this.authService.login(this.email, this.password).subscribe(userData => {
      if (userData!==null) {
        sessionStorage.setItem('token', btoa(this.email + ':' + this.password));
        localStorage.setItem('userData', btoa(JSON.stringify(userData.rolesIDs)));
        localStorage.setItem('userID', btoa(JSON.stringify(userData.id)));
        this.storeService.loggedUserID = JSON.parse(atob(localStorage.getItem('userID')));
        this.storeService.loggedUserRole = JSON.parse(atob(localStorage.getItem('userData')));
        //this.storeService.getRobotTasksByRole();

        this.robotTaskService.getRobotTasks().subscribe(tasks=>{
          this.storeService.robotTaskList = tasks;
          // filtrowanie listy zadań pod edit/delete zależnie od roli
          this.storeService.getRobotTasksByRole();
          //console.log("Lista po filtracji: " +this.robotTasks);
        });
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
