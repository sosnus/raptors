import { Component, OnInit } from '@angular/core';
import {Robot} from "../../../model/Robots/Robot";
import {RobotTask} from "../../../model/Robots/RobotTask";
import {ActivatedRoute} from "@angular/router";
import {RobotTaskService} from "../../../services/robotTask.service";
import {Polygon} from "../../../model/MapAreas/Polygons/Polygon";

@Component({
  selector: 'app-taskpanel-list',
  templateUrl: './taskpanel-list.component.html',
  styleUrls: ['./taskpanel-list.component.css']
})
export class TaskpanelListComponent implements OnInit {
  private robotTask: RobotTask = new RobotTask(null, null, null, null, null, null, null);
  private robotTasks: RobotTask[];

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
    this.robotTaskService.getRobotTasks().subscribe(robotTasks=>{
      this.robotTasks = robotTasks;
    })

    //this.checkIfFinished();

  }
  delete(robotTask: RobotTask) {
    this.robotTaskService.delete(robotTask).subscribe(
      result => {
        this.robotTasks = this.robotTasks.filter(item => item !== robotTask)
        //this.polygon = new Polygon();
      },
      error => {
        /*
                this.toastr.error("Wystąpił błąd podczas usuwania");
        */
      }
    )
  }

  checkIfFinished(){
    this.robotTasks.forEach(robotTask=>{
      if(robotTask.status === 'finished'){
        this.delete(robotTask);
      }
    })
  }
}
