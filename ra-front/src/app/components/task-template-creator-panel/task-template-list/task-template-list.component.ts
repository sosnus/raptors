import {Component, OnInit} from '@angular/core';
import {TaskTemplate} from "../../../model/Tasks/TaskTemplate";
import {BehaviourService} from "../../../services/type/behaviour.service";
import {Behaviour} from "../../../model/Robots/Behaviour";
import {TaskPriorityService} from "../../../services/type/task-priority.service";
import {TaskPriority} from "../../../model/type/TaskPriority";
import {TaskTemplateService} from "../../../services/taskTemplate.service";
import {ToastrService} from 'ngx-toastr';
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {StoreService} from "../../../services/store.service";
import {Robot} from "../../../model/Robots/Robot";
import {RobotStatus} from "../../../model/Robots/RobotStatus";
import {RobotService} from "../../../services/robot.service";
import {RobotStatusService} from "../../../services/type/robot-status.service";

@Component({
  selector: 'app-task-template-list',
  templateUrl: './task-template-list.component.html',
  styleUrls: ['./task-template-list.component.css']
})

export class TaskTemplateListComponent implements OnInit {
  modalID = "taskRobotModal";

  taskTemplate: TaskTemplate = new TaskTemplate(null, null, null, null);
  robot = new Robot(null, null, null, null, null, null, null, null, null);
  robotStatusFree: RobotStatus = new RobotStatus(null);
  robotStatusDuringTask: RobotStatus = new RobotStatus(null);
  behaviours: Behaviour[] = [];
  selectedBehaviour: string;

  taskPriorities: TaskPriority[] = [];
  selectedTaskPriority: string;

  loggedUserID: string;

  constructor(private behaviourService: BehaviourService,
              private taskPriorityService: TaskPriorityService, private TaskTemplateService: TaskTemplateService,
              private toastr: ToastrService, private authService: AuthService, private userService: UserService,
              private storeService: StoreService, private robotService: RobotService, private robotStatusService: RobotStatusService) {
    this.taskTemplate.behaviours = []
  }

  ngOnInit() {
    this.loggedUserID = JSON.parse(atob(localStorage.getItem('userID')));

    this.behaviourService.getAll().subscribe(
      behaviour => {
        console.log("Pobrane wszystkie zachowania: " + behaviour);
        this.behaviours = behaviour;
      }
    );

    this.robotStatusService.getAll().subscribe(statuses=>{
      statuses.forEach(status=>{
        if(status.name==="free"){
          this.robotStatusFree = status;
        }
        if(status.name==="during task"){
          this.robotStatusDuringTask = status;
        }
      })
    });
  }

  edit(taskTemplate: TaskTemplate) {
    Object.assign(this.taskTemplate, TaskTemplate)
  }

  delete(taskTemplate: TaskTemplate) {

    this.TaskTemplateService.delete(taskTemplate).subscribe(
      result => {
        this.storeService.taskTemplateList = this.storeService.taskTemplateList.filter(item => item != taskTemplate);
        this.toastr.success("Usunięto pomyślnie");
        this.taskTemplate = new TaskTemplate(null, null, null, null);

      },
      error => {
        this.toastr.error("Wystąpił błąd podczas usuwania");
      }
    )


  }

  reset() {
    this.taskTemplate = new TaskTemplate(null, null, null, null);
  }

}
