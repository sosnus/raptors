import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BehaviourService } from 'src/app/services/type/behaviour.service';
import { Behaviour } from 'src/app/model/Robots/Behaviour';
import { RobotTask } from 'src/app/model/Robots/RobotTask';
import { Robot } from 'src/app/model/Robots/Robot';
import { RobotStatus } from 'src/app/model/Robots/RobotStatus';
import { TaskPriority } from 'src/app/model/type/TaskPriority';
import { TaskPriorityService } from 'src/app/services/type/task-priority.service';
import { RobotTaskService } from 'src/app/services/robotTask.service';
import { StoreService } from 'src/app/services/store.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-creator',
  templateUrl: './task-creator.component.html',
  styleUrls: ['./task-creator.component.css']
})
export class TaskCreatorComponent implements OnInit {
  behaviours: Behaviour[] = [];
  behavioursComplete: Behaviour[] = [];

  robotTask: RobotTask = new RobotTask(null, null, null, null, null, null, null);
  robot = new Robot(null, null, null, null, null, null, null, null, null);
  robotStatusFree: RobotStatus = new RobotStatus(null);
  robotStatusDuringTask: RobotStatus = new RobotStatus(null);
  selectedBehaviour: string;

  taskPriorities: TaskPriority[] = [];
  selectedTaskPriority: string;

  loggedUserID: string;
  constructor(private behaviourService: BehaviourService,
    private taskPriorityService: TaskPriorityService,
    private robotTaskService: RobotTaskService,
    private storeService: StoreService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.behaviourService.getAll().subscribe(
      behaviours => {
        console.log("Pobrane wszystkie zachowania: " + behaviours.map(behaviour => console.log(behaviour)));
        this.behaviours = behaviours;
        console.log("Pobrane wszystkie tablica: " + this.behaviours);
      }
    );

    this.loggedUserID = JSON.parse(atob(localStorage.getItem('userID')));

    this.taskPriorityService.getAll().subscribe(priority => {
      this.taskPriorities = priority;
    }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  robotTaskExist(id: string) {
    return this.storeService.robotTaskList.some(item => item.id == id);
  }

  createOrUpdate() {
    let dateTime = new Date();
    this.robotTask.startTime = dateTime.toLocaleString();
    this.robotTask.status = "waiting";
    this.robotTask.userID = this.loggedUserID;
    this.robotTask.behaviours = this.behavioursComplete;
    console.log("duuupa");
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
        this.toastr.error("Wystąpił bład podczas dodawania lub edycji");
      }
    );
    this.router.navigate(['/task-creator-panel']);

  }

}
