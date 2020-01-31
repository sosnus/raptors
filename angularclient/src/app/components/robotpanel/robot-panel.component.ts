import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RobotService} from "../../services/robot.service";
import {Robot} from "../../model/Robots/Robot";

@Component({
  selector: 'app-robot-panel',
  templateUrl: './robot-panel.component.html',
  styleUrls: ['./robot-panel.component.css']
})
export class RobotPanelComponent implements OnInit {

  private robot: Robot = new Robot();

  constructor(private activatedRoute: ActivatedRoute,
              private robotService: RobotService) {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.robotService.getRobot(id).subscribe(data => {
        this.robot = data;
      })
    });
  }

  ngOnInit() {
  }

}
