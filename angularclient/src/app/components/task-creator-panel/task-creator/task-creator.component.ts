import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
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

  robotTask: RobotTask = new RobotTask(null, null, null, null, new TaskPriority("", 0), null, null);
  robot = new Robot(null, null, null, null, null, null, null, null, null);
  robotStatusFree: RobotStatus = new RobotStatus(null);
  robotStatusDuringTask: RobotStatus = new RobotStatus(null);
  selectedBehaviour: string;

  taskPriorities: TaskPriority[] = [];
  selectedTaskPriorityId: string;

  taskStatuses: string[] = ['To Do'] //, 'In Progress', 'Done']
  selectedTaskStatus: string;

  loggedUserID: string;

  modalID = "taskBehaviourEditModal";
  editingBehaviourIndex: number;
  editingBehaviour: Behaviour = new Behaviour(null, null);
  editingBehaviourParams: any;
  editingBehaviourParamKeys: string[] = [];

  specialBehaviourParams: string[] = ['corridor', 'edge', 'elementFunc', 'parkingType', 'robot', 'robotModel', 'route', 'stand', 'standType'];

  constructor(private behaviourService: BehaviourService,
    private taskPriorityService: TaskPriorityService,
    private robotTaskService: RobotTaskService,
    private storeService: StoreService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.taskPriorityService.getAll().subscribe(priority => {
      this.taskPriorities = priority;
    });

    this.behaviourService.getAll().subscribe(
      behaviours => {
        this.behaviours = behaviours;
        this.defaultBehaviours = behaviours;
      }
    );

    this.loggedUserID = JSON.parse(atob(localStorage.getItem('userID')));


    if (this.route.snapshot.paramMap.get('id') !== null) {
      this.robotTaskService.getRobotTask(this.route.snapshot.paramMap.get('id')).subscribe(
        robotTask => {
          console.log(robotTask)
          this.robotTask = robotTask;
          this.selectedTaskPriorityId = robotTask.priority.id;
          this.selectedTaskStatus = robotTask.status;
          this.behavioursComplete = robotTask.behaviours;
        }
      )
    }


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
    this.robotTask.priority = this.taskPriorities.find(p => {
      return p.id === this.selectedTaskPriorityId;
    });
    this.robotTask.status = this.selectedTaskStatus;
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
    this.editingBehaviourIndex = null;
    this.editingBehaviour = new Behaviour(null, null);
    this.editingBehaviourParams = null;
    this.editingBehaviourParamKeys = [];
  }

  updateBehaviour(modalForm: NgForm) {
    console.log("updateBehaviour");
    
    this.specialBehaviourParams.forEach(element => {
      const e = document.getElementById(element) as HTMLSelectElement;
      if(e !== null) {
        const val = e.options[e.selectedIndex].value;
        modalForm.value[element] = val;
      }
    });

    this.editingBehaviour.parameters = JSON.stringify(modalForm.value);

    if (this.behavioursComplete[this.editingBehaviourIndex].id === this.editingBehaviour.id) {

      this.behavioursComplete[this.editingBehaviourIndex] = this.editingBehaviour;
      this.robotTask.behaviours = this.behavioursComplete;

      this.robotTaskService.save(this.robotTask).subscribe(
        result => {
          if (this.robotTaskExist(this.robotTask.id)) {
            this.storeService.robotTaskList[this.storeService.robotTaskList.findIndex(item => item.id == result.id)] = result;
          } else {
            this.storeService.robotTaskList.push(result);
          }

          this.editingBehaviourIndex = null;
          this.editingBehaviour = new Behaviour(null, null);
          this.editingBehaviourParams = null;
          this.editingBehaviourParamKeys = [];
          this.toastr.success("Pomyślnie zaktualizowano zachowanie");
        },
        error => {
          this.toastr.error("Wystąpił bład podczas edycji zachowania");
        }
      );

    }

  }

  edit(index: number, behaviour: Behaviour) {
    try {
      this.editingBehaviourIndex = index;

      Object.assign(this.editingBehaviour, behaviour);

      const params = JSON.parse(String(behaviour.parameters));
      this.editingBehaviourParams = params;

      Object.assign(this.editingBehaviourParamKeys, Object.keys(params));

    } catch (error) {
      this.editingBehaviourIndex = null;
      this.editingBehaviour = new Behaviour(null, null);
      this.editingBehaviourParams = null;
      this.editingBehaviourParamKeys = [];

      this.toastr.error("Błędne parametry zachowania");
    }


  }

}
