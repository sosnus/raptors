import { Component, OnInit } from '@angular/core';
import {Robot} from "../../../model/Robots/Robot";
import {RobotTask} from "../../../model/Robots/RobotTask";
import {ActivatedRoute} from "@angular/router";
import {RobotTaskService} from "../../../services/robotTask.service";

@Component({
  selector: 'app-taskpanel-list',
  templateUrl: './taskpanel-list.component.html',
  styleUrls: ['./taskpanel-list.component.css']
})
export class TaskpanelListComponent implements OnInit {
  private robotTask: RobotTask = new RobotTask(null, null, null, null, null, null, null);

  constructor(private activatedRoute: ActivatedRoute,
              private robotTaskService: RobotTaskService) {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      console.log("wyswietlam id zadania: " + id);
      this.robotTaskService.getRobotTask(id).subscribe(data => {
        this.robotTask = data;
        console.log("Wyświetlam obiekt zadania: " + this.robotTask);
      })
    });
  }
  ngOnInit() {
  }

}
