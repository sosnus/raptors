import {Component, OnInit} from '@angular/core';
import {RobotTask} from "../../../model/Robots/RobotTask";
import {BehaviourService} from "../../../services/type/behaviour.service";
import {Behaviour} from "../../../model/Robots/Behaviour";
import {TaskPriorityService} from "../../../services/type/task-priority.service";
import {TaskPriority} from "../../../model/type/TaskPriority";
import {RobotTaskService} from "../../../services/robotTask.service";
import {ToastrService} from 'ngx-toastr';
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {StoreService} from "../../../services/store.service";
import {Robot} from "../../../model/Robots/Robot";
import {RobotStatus} from "../../../model/Robots/RobotStatus";
import {RobotService} from "../../../services/robot.service";
import {RobotStatusService} from "../../../services/type/robot-status.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {
  modalID = "taskRobotModal";

  robotTask: RobotTask = new RobotTask(null, null, null, null, null, null, null);
  robot = new Robot(null, null, null, null, null, null, null, null, null);
  robotStatusFree: RobotStatus = new RobotStatus(null);
  robotStatusDuringTask: RobotStatus = new RobotStatus(null);
  behaviours: Behaviour[] = [];
  selectedBehaviour: string;

  taskPriorities: TaskPriority[] = [];
  selectedTaskPriority: string;

  loggedUserID: string;

  constructor(private behaviourService: BehaviourService,
              private taskPriorityService: TaskPriorityService, private robotTaskService: RobotTaskService,
              private toastr: ToastrService, private authService: AuthService, private userService: UserService,
              private storeService: StoreService, private robotService: RobotService, private robotStatusService: RobotStatusService) {
    this.robotTask.behaviours = []
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

  edit(robotTask: RobotTask) {
    Object.assign(this.robotTask, robotTask)
  }

  delete(robotTask: RobotTask) {

    if(robotTask.robot!=null){
      this.robot = robotTask.robot;

      this.robot.status.forEach(status=>{
        if(status.name==="during task"){
          this.robot.status = this.robot.status.filter(status=> status.id !== this.robotStatusDuringTask.id);
          this.robot.status.push(this.robotStatusFree);
        }
      });

      this.robotService.update(this.robot).subscribe(result => {
        if (result.id != null) {
          this.toastr.success('Status robota wykonującego zmieniony');
        } else {
          this.toastr.error('Nie udało się zmienić statusu');
        }
      });
    }

    this.robotTaskService.delete(robotTask).subscribe(
      result => {
        this.storeService.robotTaskList = this.storeService.robotTaskList.filter(item => item != robotTask);
        this.toastr.success("Usunięto pomyślnie");
        this.robotTask = new RobotTask(null, null, null, null, null, null, null);
        this.robot = new Robot(null, null, null, null, null, null, null, null, null);

      },
      error => {
        this.toastr.error("Wystąpił błąd podczas usuwania");
      }
    )


  }

  reset() {
    this.robotTask = new RobotTask(null, null, null, null, null, null, null);
  }

}
