import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  copyArrayItem,
} from "@angular/cdk/drag-drop";
import { BehaviourService } from "src/app/services/type/behaviour.service";
import { Behaviour } from "src/app/model/Robots/Behaviour";
import { TaskTemplate } from "src/app/model/Tasks/TaskTemplate";
import { Robot } from "src/app/model/Robots/Robot";
import { RobotStatus } from "src/app/model/Robots/RobotStatus";
import { TaskPriority } from "src/app/model/type/TaskPriority";
import { TaskPriorityService } from "src/app/services/type/task-priority.service";
import { TaskTemplateService } from "src/app/services/taskTemplate.service";
import { StoreService } from "src/app/services/store.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { StatusType } from "src/app/model/Robots/StatusType";
import { Stand } from 'src/app/model/Stand/Stand';
import { StandService } from 'src/app/services/stand.service';

@Component({
  selector: "app-task-template-creator",
  templateUrl: "./task-template-creator.component.html",
  styleUrls: ["./task-template-creator.component.css"],
})
export class TaskTemplateCreatorComponent implements OnInit {
  behaviours: Behaviour[] = [];
  // defaultBehaviours: Behaviour{} = {};
  behavioursComplete: Behaviour[] = [];

  taskTemplate: TaskTemplate = new TaskTemplate(
    null,
    null,
    new TaskPriority("", 0),
    null
  );
  defaultBehaviours = {};
  robot = new Robot(null, null, null, null, null, null, null, null, null);
  robotStatusFree: RobotStatus = new RobotStatus(null);
  robotStatusDuringTask: RobotStatus = new RobotStatus(null);
  selectedBehaviour: string;

  taskPriorities: TaskPriority[] = [];
  selectedTaskPriorityId: string;

  kiosks: Stand[] = [];
  selectedKioskId: string;

  taskStatuses: string[] = ["To Do"]; //, 'In Progress', 'Done']
  selectedTaskStatus: StatusType;
  selectedTaskStatusName: string;

  loggedUserID: string;

  modalID = "taskBehaviourEditModal";
  editingBehaviourIndex: number;
  editingBehaviour: Behaviour = new Behaviour(null, null);
  editingBehaviourParams: any;
  editingBehaviourParamKeys: string[] = [];
  editingBehaviourDefaultParams: any;

  specialBehaviourParams: string[] = [
    "corridor",
    "edge",
    "elementFunc",
    "parkingType",
    "robot",
    "robotModel",
    "route",
    "stand",
    "standType",
  ];

  constructor(
    private behaviourService: BehaviourService,
    private taskPriorityService: TaskPriorityService,
    private taskTemplateService: TaskTemplateService,
    private standService: StandService,
    private storeService: StoreService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.taskPriorityService.getAll().subscribe((priority) => {
      this.taskPriorities = priority;
    });


    this.standService.getAll().subscribe((kiosks) => {
      this.kiosks = kiosks;
    });

    this.behaviourService.getAll().subscribe((behaviours) => {
      this.behaviours = behaviours;
      console.log(behaviours);
      behaviours.forEach(element => {
        this.defaultBehaviours[element.name] = element;
      });
    });

    this.loggedUserID = JSON.parse(atob(localStorage.getItem("userID")));

    if (this.route.snapshot.paramMap.get("id") !== null) {
      this.taskTemplateService
        .getRobotTask(this.route.snapshot.paramMap.get("id"))
        .subscribe((taskTemplate) => {
          console.log(taskTemplate);
          this.taskTemplate = taskTemplate;
          this.selectedTaskPriorityId = taskTemplate.priority.id;
          this.selectedKioskId = taskTemplate.kioskId;
          this.behavioursComplete = taskTemplate.behaviours;
        });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  robotTaskExist(id: string) {
    return this.storeService.taskTemplateList.some((item) => item.id == id);
  }

  createOrUpdate() {
    let dateTime = new Date();
    this.taskTemplate.priority = this.taskPriorities.find((p) => {
      return p.id === this.selectedTaskPriorityId;
    });
    console.log(this.selectedTaskStatusName);
    this.taskTemplate.kioskId = this.selectedKioskId;
    // this.taskTemplate.status.name = this.selectedTaskStatusName;
    this.taskTemplate.behaviours = this.behavioursComplete;

    this.taskTemplateService.save(this.taskTemplate).subscribe(
      result => {
        if (this.robotTaskExist(this.taskTemplate.id)) {
          this.storeService.taskTemplateList[
            this.storeService.taskTemplateList.findIndex(
              (item) => item.id == result.id
            )
          ] = result;
        } else {
          this.storeService.taskTemplateList.push(result);
        }
        this.taskTemplate = new TaskTemplate(
          null,
          null,
          null,
          null
        );
        this.toastr.success("Dodano lub edytowano pomyślnie");
      },
      (error) => {
        this.toastr.error("Wystąpił bład podczas dodawania lub edycji");
      }
    );
    this.router.navigate(["/task-template-creator-panel"]);
  }

  removeBehaviour(index): void {
    this.behavioursComplete.splice(index, 1);
  }

  reset() {
    console.log("reset");
    this.editingBehaviourIndex = null;
    this.editingBehaviour = new Behaviour(null, null);
    this.editingBehaviourParams = null;
    this.editingBehaviourDefaultParams = null;
    this.editingBehaviourParamKeys = [];
  }

  updateBehaviour(modalForm: NgForm) {
    console.log("updateBehaviour");

    this.editingBehaviourParamKeys.forEach((element) => {
      // console.log(element)
      const input_element = document.getElementById(element) as HTMLInputElement;
      // console.log(input_element)
      if (input_element.type == "text") {
        const val = input_element.value;
        modalForm.value[element] = val;
      }
      else if (input_element.type == "select-one") {
        const e = document.getElementById(element) as HTMLSelectElement;
        const val = e.options[e.selectedIndex].value;
        modalForm.value[element] = val;
      }
    });

    this.editingBehaviour.parameters = JSON.stringify(modalForm.value);

    if (
      this.behavioursComplete[this.editingBehaviourIndex].id ===
      this.editingBehaviour.id
    ) {
      this.behavioursComplete[
        this.editingBehaviourIndex
      ] = this.editingBehaviour;
      this.taskTemplate.behaviours = this.behavioursComplete;

      this.editingBehaviourIndex = null;
      this.editingBehaviour = new Behaviour(null, null);
      this.editingBehaviourParams = null;
      this.editingBehaviourDefaultParams = null;
      this.editingBehaviourParamKeys = [];
      this.toastr.success("Pomyślnie zaktualizowano zachowanie");

      // this.taskTemplateService.save(this.taskTemplate).subscribe(
      //   (result) => {
      //     if (this.robotTaskExist(this.taskTemplate.id)) {
      //       this.storeService.robotTaskList[
      //         this.storeService.robotTaskList.findIndex(
      //           (item) => item.id == result.id
      //         )
      //       ] = result;
      //     } else {
      //       this.storeService.robotTaskList.push(result);
      //     }

      //     this.editingBehaviourIndex = null;
      //     this.editingBehaviour = new Behaviour(null, null);
      //     this.editingBehaviourParams = null;
      //     this.editingBehaviourParamKeys = [];
      //     this.toastr.success("Pomyślnie zaktualizowano zachowanie");
      //   },
      //   (error) => {
      //     this.toastr.error("Wystąpił bład podczas edycji zachowania");
      //   }
      // );
    }
  }

  edit(index: number, behaviour: Behaviour) {
    try {
      this.editingBehaviourIndex = index;

      var thisBehaviour = new Behaviour(null, null);
      Object.assign(thisBehaviour, this.defaultBehaviours[behaviour.name]);
      const params = JSON.parse(String(behaviour.parameters));
      const defaultParams = JSON.parse(String(thisBehaviour.parameters));
      // Object.keys(params).forEach(element => {
      //   if(defaultParams.includes(element)){
      //     defaultParams[element] = params[element];
      //   }
      // });


      Object.assign(this.editingBehaviour, thisBehaviour);

      // const params = JSON.parse(String(behaviour.parameters));
      this.editingBehaviourParams = params;
      this.editingBehaviourDefaultParams = defaultParams;

      console.log(this.defaultBehaviours);
      console.log(params);

      Object.assign(this.editingBehaviourParamKeys, Object.keys(defaultParams));
    } catch (error) {
      console.log(error);
      this.editingBehaviourIndex = null;
      this.editingBehaviour = new Behaviour(null, null);
      this.editingBehaviourParams = null;
      this.editingBehaviourDefaultParams = null;
      this.editingBehaviourParamKeys = [];

      this.toastr.error("Błędne parametry zachowania");
    }
  }
}
