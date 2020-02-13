import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RobotService} from "../../services/robot.service";
import {Robot} from "../../model/Robots/Robot";
import {LogService} from "../../services/log.service";
import {Log} from "../../model/Robots/Log";

@Component({
  selector: 'app-robot-panel',
  templateUrl: './robot-panel.component.html',
  styleUrls: ['./robot-panel.component.css']
})
export class RobotPanelComponent implements OnInit {

  private robot: Robot = new Robot();
  private logs: Log[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private robotService: RobotService,
              private logService: LogService) {
  }

  private fetchIDfromRoute() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.getRobotData(id);
    });
  }

  private getRobotData(id) {
    this.robotService.getByID(id).subscribe(data => {
      this.robot = data;
      this.getLogs();
    })
  }

  private getLogs() {
    this.logService.getLogsFromRobot(this.robot.id).subscribe(logs => {
      this.logs = logs
    })
  }

  ngOnInit() {
    this.fetchIDfromRoute();
  }

}
