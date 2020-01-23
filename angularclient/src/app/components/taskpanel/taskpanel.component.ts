import { Component, OnInit } from '@angular/core';
import {RobotTask} from "../../model/Robots/RobotTask";
import {RobotService} from "../../services/robot.service";

@Component({
  selector: 'app-taskpanel',
  templateUrl: './taskpanel.component.html',
  styleUrls: ['./taskpanel.component.css']
})
export class TaskpanelComponent implements OnInit {

  robotTask: RobotTask;
  constructor(robotService: RobotService) {
    this.robotTask = new RobotTask(null, null, null, null, null, null, null);
  }

  ngOnInit() {
  }
  
  getFreeRobot(){
    
  }

}
