import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
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
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-task-creator',
  templateUrl: './task-creator.component.html',
  styleUrls: ['./task-creator.component.css']
})
export class TaskCreatorComponent implements OnInit {
  behaviours: Behaviour[] = [];
  defaultBehaviours: Behaviour[] = [];
  behavioursComplete: Behaviour[] = [];

  robotTask: RobotTask = new RobotTask(null, null, null, null, null, null, null);
  robot = new Robot(null, null, null, null, null, null, null, null, null);
  robotStatusFree: RobotStatus = new RobotStatus(null);
  robotStatusDuringTask: RobotStatus = new RobotStatus(null);
  selectedBehaviour: string;

  taskPriorities: TaskPriority[] = [];
  selectedTaskPriority: string;

  loggedUserID: string;

  modalID = "taskBehaviourEditModal";
  editingBehaviourIndex: number;
  editingBehaviour: Behaviour = new Behaviour(null, null);
  editingBehaviourParams: any;
  editingBehaviourParamKeys: string[] = [];

  constructor(private behaviourService: BehaviourService,
    private taskPriorityService: TaskPriorityService,
    private robotTaskService: RobotTaskService,
    private storeService: StoreService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      this.robotTaskService.getRobotTask(this.route.snapshot.paramMap.get('id')).subscribe(
        robotTask => {
          console.log(robotTask)
          this.robotTask = robotTask;
          this.selectedTaskPriority = robotTask.priority.id;
          this.behavioursComplete = robotTask.behaviours;
        }
      )
    }

    this.behaviourService.getAll().subscribe(
      behaviours => {
        this.behaviours = behaviours;
        this.defaultBehaviours = behaviours;
      }
    );

    this.loggedUserID = JSON.parse(atob(localStorage.getItem('userID')));

    this.taskPriorityService.getAll().subscribe(priority => {
      this.taskPriorities = priority;
    });

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
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
    this.robotTask.status = this.selectedTaskPriority;
    this.robotTask.userID = this.loggedUserID;
    this.robotTask.behaviours = this.behavioursComplete;

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

  removeBehaviour(index): void {
    this.behavioursComplete.splice(index, 1)
  }

  reset() {
    console.log("reset");
  }

  updateBehaviour(modalForm: NgForm) {
    console.log("updateBehaviour");
    console.log(modalForm.value);

    this.editingBehaviour.parameters = JSON.stringify(modalForm.value);
    this.behavioursComplete[this.editingBehaviourIndex] = this.editingBehaviour;
    this.robotTaskService.save(this.robotTask).subscribe(result => {
      console.log("Updated task")
      console.log(result);
    });

    // this.behaviourService.save(this.editingBehaviour).subscribe(result => {
    //   console.log("Updated behaviour")
    //   console.log(result);
    // });
  }

  edit(index: number, behaviour: Behaviour) {
    this.editingBehaviourIndex = index;
    console.log(this.editingBehaviourIndex);

    Object.assign(this.editingBehaviour, behaviour);

    const params = JSON.parse(String(behaviour.parameters));
    this.editingBehaviourParams = params;

    Object.assign(this.editingBehaviourParamKeys, Object.keys(params));

  }

}
