import {Component, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {RobotService} from "../../services/robot.service";
import {StoreService} from "../../services/store.service";
import {RobotTaskService} from "../../services/robotTask.service";
import {RobotTask} from "../../model/Robots/RobotTask";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnChanges {

  robotDataloaded = false;
  private robotIDlist = [];

  private robotTasks: RobotTask[];
  private robotTask: RobotTask;

  private i=0;
  private j=0;
  constructor(private storeService: StoreService, private robotTaskService: RobotTaskService) {
  }

  ngOnInit() {
    //console.log("test: " + this.storeService.robotsObjects[1].robotIP);
    this.storeService.getRobotIDlist().subscribe(
      rob => {
        this.robotDataloaded = true;
        this.robotIDlist = rob;
        console.log("Pobieram listę id robotów: " + this.robotIDlist);
      }
    );

    this.robotTaskService.getRobotTasks().subscribe(robotTask=>{
      this.robotTasks = robotTask;
    })


  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    this.robotTaskService.getRobotTasks().subscribe(robotTask =>
    {
      this.robotTasks = robotTask;
      this.robotTasks.forEach(task=>{
        this.robotTasks = this.robotTasks.filter(item => item.id === task.id);
      })
    }
    )
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

}
