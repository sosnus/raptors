import {Component, OnInit} from '@angular/core';
import {Robot} from "../../../model/Robots/Robot";
import {RobotTask} from "../../../model/Robots/RobotTask";
import {ActivatedRoute} from "@angular/router";
import {RobotTaskService} from "../../../services/robotTask.service";
import {Polygon} from "../../../model/MapAreas/Polygons/Polygon";
import {StoreService} from "../../../services/store.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-taskpanel-list',
  templateUrl: './taskpanel-list.component.html',
  styleUrls: ['./taskpanel-list.component.css']
})
export class TaskpanelListComponent implements OnInit {
  private robotTask: RobotTask = new RobotTask(null, null, null, null, null, null, null);
  private robotTasks: RobotTask[];

  constructor(private activatedRoute: ActivatedRoute,
              private robotTaskService: RobotTaskService,
              private storeService: StoreService,
              private toastr: ToastrService) {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.robotTaskService.getRobotTask(id).subscribe(data => {
        this.robotTask = data;
      })
    });
  }

  ngOnInit() {
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

  checkIfFinished() {
    this.robotTasks.forEach(robotTask => {
      if (robotTask.status === 'finished') {
        this.delete(robotTask);
      }
    })
  }
}
