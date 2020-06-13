import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {timer} from 'rxjs';
import {SpecialProperty} from "../../../model/GenericRobotModel/SpecialProperty/SpecialProperty";
import {SpecialPropertyEnum} from "../../../model/GenericRobotModel/SpecialProperty/SpecialPropertyEnum";

@Component({
  selector: 'app-robot-details-new',
  templateUrl: './robot-details-new.component.html',
  styleUrls: ['./robot-details-new.component.css'],
})
export class RobotDetailsComponentNew implements OnInit, AfterViewChecked {

  @Input()
  properties: Array<SpecialProperty>;

  @Output("refreshEvent")
  refreshEvent: EventEmitter<any> = new EventEmitter();

  typeEnum = SpecialPropertyEnum;

  ngOnInit() {
    this.refreshRepeater();
  }

  ngAfterViewChecked(){
    this.updateBatteryIcon();
  }

  refresh() {
    this.refreshEvent.emit();
    this.updateBatteryIcon();
  }

  private refreshRepeater() {
    timer(60000, 60000).subscribe(x => {
      this.refreshEvent.emit();
    })
  }

  private updateBatteryIcon() {
    const batteryElement = document.getElementById("batteryLevel");
    if (batteryElement !== null && batteryElement !== undefined) {
      const batteryLevel = this.getBatteryLevel();
      batteryElement.style.height = `${batteryLevel}%`;
      if (batteryLevel < 15) {
        batteryElement.className = 'battery-level error';
      } else if (batteryLevel < 30) {
        batteryElement.className = 'battery-level warn';
      } else {
        batteryElement.className = 'battery-level';
      }
    }
  }

  private getBatteryLevel() {
    if (this.properties !== null && this.properties !== undefined) {
      return Number(this.properties.find(prop => prop.specialType === SpecialPropertyEnum.BATTERY_LEVEL).getValue());
    } else {
      return 0;
    }
  }
}
