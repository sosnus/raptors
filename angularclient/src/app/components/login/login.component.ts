import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {RobotTaskService} from '../../services/robotTask.service';
import {StoreService} from '../../services/store.service';
import {HealthzService} from '../../services/healthz.service';

declare var require: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  frontVersion: string = require('../../../../package.json').version;
  backVersion = '';
  backend = false;
  database = false;
  databaseAdress = '';
  databaseName = '';

  constructor(private authService: AuthService,
              private router: Router,
              private toast: ToastrService,
              private healthzService: HealthzService) {
  }

  ngOnInit() {
    this.healthzService.isBackendWorking().subscribe(data =>
        this.backend = data,
      error => {
        console.log(error);
      }
    );
    this.healthzService.isDatabaseWorking().subscribe(data => // a to sie nie udaje xD
        this.database = data,
      error => {
        console.log(error);
      }
    );
    this.healthzService.getDatabaseAdress().subscribe(data =>
        this.databaseAdress = data,
      error => {
        console.log(error);
      }
    );
    this.healthzService.getDatabaseName().subscribe(data =>
        this.databaseName = data,
      error => {
        console.log(error);
      }
    );
    this.healthzService.getBackendVersion().subscribe(data => { // udaje sie
        this.backVersion = data;
        console.log(this.backVersion);  // czemu tu jest html? xD
      },
      error => {
        console.log(error);
      }
    );// czyto ejst git? tak, chyba działa, jeszcze to niżej pole nie działa ale to też token trzeba wyjebać... ciekway problem xD
    // takie w miar e logizcny, bo jednk z tokenem to html ma już zuepłnie inną budowę xd
    // tylko czemu zwracał htmla zamiast dać ze nie udało sie fechować xD
    // pewnie nie było jakiegoś opodwienidego łąpania błeó xd
    // nie działa... tam jest większa logika chbya, zaraz zmienie i potestuje
    // to ja bęe patrzył ;) ok xD
  }


  login() {
    this.authService.login(this.email, this.password).subscribe(userData => {
      if (userData!==null) {
        sessionStorage.setItem('token', btoa(this.email + ':' + this.password));
        localStorage.setItem('userData', btoa(JSON.stringify(userData.rolesIDs)));
        localStorage.setItem('userID', btoa(JSON.stringify(userData.id)));

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
