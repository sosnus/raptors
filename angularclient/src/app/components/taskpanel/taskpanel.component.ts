import {Component, OnInit} from '@angular/core';
import {RobotTask} from "../../model/Robots/RobotTask";
import {RobotService} from "../../services/robot.service";
import {Robot} from "../../model/Robots/Robot";
import {BehaviourService} from "../../services/type/behaviour.service";
import {Behaviour} from "../../model/Robots/Behaviour";
import {TaskPriorityService} from "../../services/type/task-priority.service";
import {TaskPriority} from "../../model/type/TaskPriority";
import {Task} from "protractor/built/taskScheduler";
import {RobotTaskService} from "../../services/robotTask.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/User/User";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-taskpanel',
  templateUrl: './taskpanel.component.html',
  styleUrls: ['./taskpanel.component.css']
})
export class TaskpanelComponent implements OnInit {

  robotTask: RobotTask = new RobotTask(null, null, null, null, null, null, null);
  robotTasks: RobotTask[] = [];
  //task = null;
  behaviours: Behaviour[] = [];
  selectedBehaviour: string;
  loggedUserRole: string;
  loggedUserID: string;

  taskPriorities: TaskPriority[];
  selectedTaskPriority: string;

  constructor(private behaviourService: BehaviourService,
              private taskPriorityService: TaskPriorityService, private robotTaskService: RobotTaskService,
              private toastr: ToastrService, private authService: AuthService, private userService: UserService) {
    this.robotTask.behaviours = new Array<Behaviour>();
    this.robotTasks = new Array<RobotTask>();
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

    this.robotTaskService.getRobotTasks().subscribe(tasks=>{
      this.robotTasks = tasks;
      // filtrowanie listy zadań pod edit/delete zależnie od roli
      this.getRobotTasksByRole();
      //console.log("Lista po filtracji: " +this.robotTasks);
      this.robotTasks.forEach(task=>{
        //console.log("NAZWA ZADANKA POZOSTALEGO: " + task.name);
      });
    });
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

  saveRobotTask() {
    this.robotTask.status = "waiting";
    this.robotTask.userID = this.loggedUserID;
    //this.robotTask.behaviours = this.selectedBehaviour; // tu musi być lista
    //this.robotTask.priority = this.selectedTaskPriority;
    this.robotTaskService.save(this.robotTask).subscribe(
      result => console.log('Response' + result),
      error => console.log('Error' + error));
    console.log('RobotTask', this.robotTask);
    this.toastr.success('Dodano pomyślnie');
    this.robotTask = new RobotTask(null, null, null, null, null, null, null);
  }

  getRobotTasksByRole(){
    // REGULAR_ROLE_USER
    if(this.loggedUserRole == 'ROLE_REGULAR_USER'){
      this.robotTasks = this.robotTasks.filter(task=> task.userID == this.loggedUserID);
    }
  }
}
