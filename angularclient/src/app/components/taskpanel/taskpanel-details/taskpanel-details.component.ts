import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Robot} from "../../../model/Robots/Robot";
import {RobotTask} from "../../../model/Robots/RobotTask";
import {Polygon} from "../../../model/MapAreas/Polygons/Polygon";
import {RobotTaskService} from "../../../services/robotTask.service";
import {ToastrService} from "ngx-toastr";
import {StoreService} from "../../../services/store.service";

@Component({
  selector: 'app-taskpanel-details',
  templateUrl: './taskpanel-details.component.html',
  styleUrls: ['./taskpanel-details.component.css']
})
export class TaskpanelDetailsComponent implements OnInit {

  @Input()
  task: RobotTask;

  robotTasks: RobotTask[] = [];

  constructor(private robotTaskService: RobotTaskService, private toast: ToastrService, private storeService: StoreService) {

  }

  ngOnInit() {

  }

  delete() {
    this.robotTaskService.delete(this.task).subscribe(
      result => {
        this.storeService.robotTaskList = this.storeService.robotTaskList.filter(item => item !== this.task);
        this.toast.success('Anulowano zadanie')
      },
      error => {
        this.toast.error('Wystąpił błąd podczas operacji')

      }
    )
  }

}
