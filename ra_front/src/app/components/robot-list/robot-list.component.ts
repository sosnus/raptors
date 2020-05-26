import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-robot-list',
  templateUrl: './robot-list.component.html',
  styleUrls: ['./robot-list.component.css']
})
export class RobotListComponent implements OnInit {

  robotApprovedEvent: Subject<void> = new Subject<void>();

  refreshRobots() {
    this.robotApprovedEvent.next();
  }

  constructor() { }

  ngOnInit() {
  }

}
