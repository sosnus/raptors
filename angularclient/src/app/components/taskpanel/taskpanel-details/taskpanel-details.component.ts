import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Robot} from "../../../model/Robots/Robot";
import {RobotTask} from "../../../model/Robots/RobotTask";
import {Polygon} from "../../../model/MapAreas/Polygons/Polygon";
import {RobotTaskService} from "../../../services/robotTask.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-taskpanel-details',
  templateUrl: './taskpanel-details.component.html',
  styleUrls: ['./taskpanel-details.component.css']
})
export class TaskpanelDetailsComponent implements OnInit {

  @Input()
  task: RobotTask;

  robotTasks: RobotTask[] = [];
  /*@Output()
  robotTaskDelete: EventEmitter<RobotTask> = new EventEmitter<RobotTask>();*/

  constructor(private robotTaskService: RobotTaskService, private toast: ToastrService) {

  }

  ngOnInit() {
    this.robotTaskService.getRobotTasks().subscribe(robotTask=>{
      this.robotTasks = robotTask;
    })
  }

  delete() {
    this.robotTaskService.delete(this.task).subscribe(
      result => {
        this.robotTasks = this.robotTasks.filter(item => item !== this.task);
        this.toast.success('Anulowano zadanie')
      },
      error => {
        this.toast.error('Wystąpił błąd podczas operacji')

      }
    )
  }

}
