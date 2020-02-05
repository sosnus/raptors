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

@Component({
  selector: 'app-taskpanel',
  templateUrl: './taskpanel.component.html',
  styleUrls: ['./taskpanel.component.css']
})
export class TaskpanelComponent implements OnInit {

  robotTask: RobotTask = new RobotTask(null, null, null, null, null, null, null);
  task = null;
  behaviour: Behaviour;
  behaviours: Behaviour[] = [];
  selectedBehaviour: string;

  taskPriority: TaskPriority;
  taskPriorities: TaskPriority[];
  selectedTaskPriority: string;
  constructor(private behaviourService: BehaviourService,
              private taskPriorityService: TaskPriorityService, private robotTaskService: RobotTaskService,
              private toastr: ToastrService) {
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
    this.task = this.robotTask;
    this.robotTask = new RobotTask(null, null, null, null, null, null, null);
  }
}
