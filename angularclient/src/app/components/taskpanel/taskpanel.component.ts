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
  //task = null;
  behaviour: Behaviour;
  behaviours: Behaviour[] = [];
  selectedBehaviour: string;
  loggedUser: User;
  users: User[] = [];

  taskPriority: TaskPriority;
  taskPriorities: TaskPriority[];
  selectedTaskPriority: string;
  constructor(private behaviourService: BehaviourService,
              private taskPriorityService: TaskPriorityService, private robotTaskService: RobotTaskService,
              private toastr: ToastrService, private authService: AuthService, private userService: UserService) {
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

    this.userService.getUsers().subscribe(users=>{
      users.forEach(user=>{
        this.users.push(user);
      })
    })

    this.loggedUser = JSON.parse(atob(localStorage.getItem('userData')));
    console.log("User to: " + this.loggedUser);
   /* this.loggedUser = JSON.parse(localStorage.getItem('userData'));
    if(this.authService.userLoggedIn()){
      this.robotTask.userID = this.loggedUser.id;
      console.log("Id zalogowanego użytkownika: " + this.robotTask.userID);
    }*/

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
    this.robotTask.userID = "Uzytkownik";
    //this.robotTask.behaviours = this.selectedBehaviour; // tu musi być lista
    //this.robotTask.priority = this.selectedTaskPriority;
    this.robotTaskService.save(this.robotTask).subscribe(
      result => console.log('Response' + result),
      error => console.log('Error' + error));
    console.log('RobotTask', this.robotTask);
    this.toastr.success('Dodano pomyślnie');
    this.robotTask = new RobotTask(null, null, null, null, null, null, null);
  }
}
