import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Robot } from "../../../model/Robots/Robot";
import { RobotTask } from "../../../model/Robots/RobotTask";
import { RobotTaskService } from "../../../services/robotTask.service";
import { ToastrService } from "ngx-toastr";
import { RobotService } from "../../../services/robot.service";
import { AuthService } from "../../../services/auth.service";
import { RobotStatusService } from "../../../services/type/robot-status.service";
import { RobotStatus } from "../../../model/Robots/RobotStatus";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  task: RobotTask;

  constructor(private robotTaskService: RobotTaskService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.robotTaskService.getRobotTask(this.route.snapshot.paramMap.get('id')).subscribe(
      robotTask =>
        this.task = robotTask
    )
  }
}
