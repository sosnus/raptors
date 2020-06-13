import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { timer } from 'rxjs';
import {Robot} from "../../../model/Robots/Robot";
import { Orientation } from 'src/app/model/Stand/Orientation';

@Component({
  selector: 'app-robot-details-new',
  templateUrl: './robot-details-new.component.html',
  styleUrls: ['./robot-details-new.component.css']
})
export class RobotDetailsComponentNew implements OnInit, OnChanges {

  @Input()
  robot: Robot;

  @Output("refreshEvent")
  refreshEvent: EventEmitter<any> = new EventEmitter();

  refresh() {
    this.refreshEvent.emit();
    this.updateBatteryIcon();
  }

  private updateBatteryIcon() {
    document.getElementById("batteryLevel").style.height = `${this.robot.batteryLevel}%`;

    if (this.robot.batteryLevel < 15) {
      document.getElementById("batteryLevel").className = 'battery-level error';
    } else if (this.robot.batteryLevel < 30) {
      document.getElementById("batteryLevel").className = 'battery-level warn';
    } else {
      document.getElementById("batteryLevel").className = 'battery-level';
    }
  }

  private refreshRepeater() {
    timer(60000, 60000).subscribe(x => {
      this.refreshEvent.emit();
    })
  }

  orientationToString(orientation: Orientation) {
    const o = this.quaternionToEuler(orientation);

    return "yaw " + o[0].toFixed(2) + "° : pitch " + o[1].toFixed(2) + "° : roll " + o[2].toFixed(2) + "°";
  }

  private quaternionToEuler(quaternion: Orientation) {
    var t0 = +2.0 * (quaternion.w * quaternion.x + quaternion.y * quaternion.z);
    var t1 = +1.0 - 2.0 * (quaternion.x * quaternion.x + quaternion.y * quaternion.y);
    const roll = this.radianToDegree(Math.atan2(t0, t1));

    var t2 = +2.0 * (quaternion.x * quaternion.y - quaternion.z * quaternion.x);
    t2 = t2 > +1.0 ? +1.0 : t2;
    t2 = t2 < -1.0 ? -1.0 : t2;
    const pitch = this.radianToDegree(Math.asin(t2));

    var t3 = +2.0 * (quaternion.w * quaternion.z + quaternion.x * quaternion.y);
    var t4 = +1.0 - 2.0 * (quaternion.y * quaternion.y + quaternion.z * quaternion.z);
    const yaw = this.radianToDegree(Math.atan2(t3, t4));

    return [yaw, pitch, roll];
  }

  private radianToDegree(radian: number) {
    return radian * 57.2957795131;
  }

  constructor() { }

  ngOnInit() {
    this.refreshRepeater();
  }

  ngOnChanges(){
    this.updateBatteryIcon();
  }

}
