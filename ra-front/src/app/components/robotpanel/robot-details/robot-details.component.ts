import {Component, Input, OnInit} from '@angular/core';
import {Robot} from "../../../model/Robots/Robot";

@Component({
  selector: 'app-robot-details',
  templateUrl: './robot-details.component.html',
  styleUrls: ['./robot-details.component.css']
})
export class RobotDetailsComponent implements OnInit {

  @Input()
  robot: Robot;

  constructor() { }

  ngOnInit() {
  }

}
