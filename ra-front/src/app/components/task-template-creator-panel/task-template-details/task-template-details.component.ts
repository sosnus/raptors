import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Robot } from "../../../model/Robots/Robot";
import { TaskTemplateService } from "../../../services/taskTemplate.service";
import { ToastrService } from "ngx-toastr";
import { RobotService } from "../../../services/robot.service";
import { AuthService } from "../../../services/auth.service";
import { RobotStatusService } from "../../../services/type/robot-status.service";
import { RobotStatus } from "../../../model/Robots/RobotStatus";
import { ActivatedRoute } from '@angular/router';
import { TaskTemplate } from 'src/app/model/Tasks/TaskTemplate';

@Component({
  selector: 'app-task-template-details',
  templateUrl: './task-template-details.component.html',
  styleUrls: ['./task-template-details.component.css']
})
export class TaskTemplateDetailsComponent implements OnInit {
  task: TaskTemplate;

  constructor(private taskTemplateService: TaskTemplateService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.taskTemplateService.getRobotTask(this.route.snapshot.paramMap.get('id')).subscribe(
      taskTemplate =>
        this.task = taskTemplate
    )
  }
}
