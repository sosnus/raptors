import {Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {timer} from 'rxjs';
import {Robot} from "../../../model/Robots/Robot";

@Component({
  selector: 'app-robot-details-new',
  templateUrl: './robot-details-new.component.html',
  styleUrls: ['./robot-details-new.component.css']
})
export class RobotDetailsComponentNew implements OnInit {

  @Input()
  robot: Robot;

  @Output("refreshEvent")
  refreshEvent: EventEmitter<any> = new EventEmitter();

  refresh() {
    this.refreshEvent.emit();
  }

  private refreshRepeater() {
    timer(60000, 60000).subscribe(x => {
      this.refreshEvent.emit();
    })
  }

  constructor() { }

  ngOnInit() {
    this.refreshRepeater();
  }

}
