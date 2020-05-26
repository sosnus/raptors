import {Component, Input, OnInit} from '@angular/core';
import {RobotModel} from "../../../model/Robots/RobotModel";

@Component({
  selector: 'app-robot-model',
  templateUrl: './robot-model.component.html',
  styleUrls: ['./robot-model.component.css']
})
export class RobotModelComponent implements OnInit {

  @Input()
  model: RobotModel;

  constructor() { }

  ngOnInit() {
  }

}
