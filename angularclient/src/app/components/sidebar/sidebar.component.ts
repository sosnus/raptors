import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {RobotService} from "../../services/robot.service";
import {StoreService} from "../../services/store.service";
import {RobotTaskService} from "../../services/robotTask.service";
import {RobotTask} from "../../model/Robots/RobotTask";
import {Robot} from "../../model/Robots/Robot";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  robotDataloaded = false;
  private robotList: Robot[] = [];

  loggedUserRole: string;
  loggedUserID: string;


  constructor(private storeService: StoreService,
              private robotTaskService: RobotTaskService,
              private robotService: RobotService,
              private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.userLoggedIn()) {
      this.loggedUserID = JSON.parse(atob(localStorage.getItem('userID')));
      this.loggedUserRole = JSON.parse(atob(localStorage.getItem('userData')));
      this.robotService.getAll().subscribe(
        data => {
          this.robotDataloaded = true;
          this.robotList = data;
        }
      );

      this.robotTaskService.getRobotTasks().subscribe(tasks => {
        this.storeService.robotTaskList = tasks;
        // filtrowanie listy zadań pod edit/delete zależnie od roli
        this.getRobotTasksByRole();
      });
    }
  }


  rotateIcon(elementID: string): void {
    document.getElementById(elementID).classList.toggle('down');
  }

  getRobotTasksByRole() {
    // REGULAR_ROLE_USER
    if (this.loggedUserRole == 'ROLE_REGULAR_USER') {
      this.storeService.robotTaskList = this.storeService.robotTaskList.filter(task => task.userID == this.loggedUserID);
    }
  }

}
