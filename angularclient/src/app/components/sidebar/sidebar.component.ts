import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {RobotService} from "../../services/robot.service";
import {StoreService} from "../../services/store.service";
import {RobotTaskService} from "../../services/robotTask.service";
import {RobotTask} from "../../model/Robots/RobotTask";
import {Robot} from "../../model/Robots/Robot";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  robotDataloaded = false;
  private robotList: Robot[] = [];

  loggedUserRole: string;
  loggedUserID: string;


  constructor(private storeService: StoreService,
              private robotTaskService: RobotTaskService,
              private robotService: RobotService) {
  }

  ngOnInit() {
    this.loggedUserID = JSON.parse(atob(localStorage.getItem('userID')));
    this.loggedUserRole = JSON.parse(atob(localStorage.getItem('userData')));

    //console.log("test: " + this.storeService.robotsObjects[1].robotIP);
    this.robotService.getRobots().subscribe(
      data => {
        this.robotDataloaded = true;
        this.robotList = data;
      }
    );

    this.robotTaskService.getRobotTasks().subscribe(tasks=>{
      this.storeService.robotTaskList = tasks;
      // filtrowanie listy zadań pod edit/delete zależnie od roli
      this.getRobotTasksByRole();
      //console.log("Lista po filtracji: " +this.robotTasks);
    });


  }


  rotateIcon(elementID: string): void {
    document.getElementById(elementID).classList.toggle('down');
  }

  showRobotOnMap(){
    /* for(this.i=0;this.i<=this.robotIDlist.length;this.i++){
       for(this.j=0; this.j<=this.storeService.robotsObjects.length;this.j++){
         if(this.robotIDlist[this.i]===this.storeService.robotsObjects[0].id){
           console.log("IP robota o id "+this.robotIDlist[this.i] + " to: " + this.storeService.robotsObjects[this.j].robotIP)
         }
       }
     }*/
  }

  getRobotTasksByRole(){
    // REGULAR_ROLE_USER
    if(this.loggedUserRole == 'ROLE_REGULAR_USER'){
      this.storeService.robotTaskList = this.storeService.robotTaskList.filter(task=> task.userID == this.loggedUserID);
    }
  }

}
