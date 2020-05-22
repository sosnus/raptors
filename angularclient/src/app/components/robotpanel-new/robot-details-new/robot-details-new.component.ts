import {Component, Input, OnInit} from '@angular/core';
import {Robot} from "../../../model/Robots/Robot";

@Component({
  selector: 'app-robot-details-new',
  templateUrl: './robot-details-new.component.html',
  styleUrls: ['./robot-details-new.component.css']
})
export class RobotDetailsComponentNew implements OnInit {

  @Input()
  robot: Robot;

  constructor() { }

  ngOnInit() {
  }

}
