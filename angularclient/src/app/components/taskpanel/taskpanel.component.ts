import {Component, OnInit} from '@angular/core';
import {RobotTask} from "../../model/Robots/RobotTask";
import {BehaviourService} from "../../services/type/behaviour.service";
import {Behaviour} from "../../model/Robots/Behaviour";
import {TaskPriorityService} from "../../services/type/task-priority.service";
import {TaskPriority} from "../../model/type/TaskPriority";
import {RobotTaskService} from "../../services/robotTask.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {StoreService} from "../../services/store.service";

@Component({
  selector: 'app-taskpanel',
  templateUrl: './taskpanel.component.html',
  styleUrls: ['./taskpanel.component.css']
})
export class TaskpanelComponent implements OnInit {
  modalID = "taskRobotModal";

  robotTask: RobotTask = new RobotTask(null, null, null, null, null, null, null);
  //task = null;
  behaviours: Behaviour[] = [];
  selectedBehaviour: string;
  loggedUserRole: string;
  loggedUserID: string;

  taskPriorities: TaskPriority[];
  selectedTaskPriority: string;

  constructor(private behaviourService: BehaviourService,
              private taskPriorityService: TaskPriorityService, private robotTaskService: RobotTaskService,
              private toastr: ToastrService, private authService: AuthService, private userService: UserService,
              private storeService: StoreService) {
    this.robotTask.behaviours = new Array<Behaviour>();
  }

  ngOnInit() {
    this.behaviourService.getAll().subscribe(
      behaviour => {
        this.behaviours = behaviour;
      }
    );

    this.taskPriorityService.getAll().subscribe(priority => {
        this.taskPriorities = priority;
      }
    );

    this.loggedUserID = JSON.parse(atob(localStorage.getItem('userID')));
    this.loggedUserRole = JSON.parse(atob(localStorage.getItem('userData')));
  }

  selectBehaviour(id: string) {
    console.log(id);
    this.selectedBehaviour = id;
    this.behaviours.forEach(behaviour=>{
      if(behaviour.id === this.selectedBehaviour){
        this.robotTask.behaviours.push(behaviour);
      }
    });
  }

  selectTaskPriority(id: string) {
    console.log(id);
    this.selectedTaskPriority = id;
    this.taskPriorities.forEach(taskPriority=>{
      if(taskPriority.id === this.selectedTaskPriority){
        this.robotTask.priority = taskPriority;
      }
    });
  }

  createOrUpdate() {
    let dateTime = new Date();
    this.robotTask.startTime = dateTime.toLocaleString();
    this.robotTask.status = "waiting";
    this.robotTask.userID = this.loggedUserID;
    this.robotTaskService.save(this.robotTask).subscribe(
      result => {
        if (this.robotTaskExist(this.robotTask.id)) {
          this.storeService.robotTaskList[this.storeService.robotTaskList.findIndex(item => item.id == result.id)] = result;
        } else {
          this.storeService.robotTaskList.push(result);
        }
        this.robotTask = new RobotTask(null, null, null, null, null, null, null);
        this.toastr.success("Dodano lub edytowano pomyślnie");
      },
      error => {
        this.toastr.error("W ystąpił bład podczas dodawania lub edycji");
      }
    )
  }

  robotTaskExist(id: string) {
    return this.storeService.robotTaskList.some(item => item.id == id);
  }

  getRobotTasksByRole(){
    // REGULAR_ROLE_USER
    if(this.loggedUserRole == 'ROLE_REGULAR_USER'){
      this.storeService.robotTaskList = this.storeService.robotTaskList.filter(task=> task.userID == this.loggedUserID);
    }
  }

  edit(robotTask: RobotTask) {
    Object.assign(this.robotTask, robotTask)
  }

  delete(robotTask: RobotTask) {
    this.robotTaskService.delete(robotTask).subscribe(
      result => {
        this.storeService.robotTaskList = this.storeService.robotTaskList.filter(item => item != robotTask)
        this.toastr.success("Usunięto pomyślnie");
        this.robotTask = new RobotTask(null, null, null, null, null, null, null);
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
