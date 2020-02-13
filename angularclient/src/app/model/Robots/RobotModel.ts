import {PropulsionType} from "../type/PropulsionType";
import {BatteryType} from "../type/BatteryType";

export class RobotModel {
  id: string;
  name: string;
  maxLiftingCapacity: string;
  maxVelocity: string;
  length: string;
  width: string;
  height: string;
  turningRadius: string;
  propulsionType: PropulsionType;
  batteryType: BatteryType;


  constructor(name: string = '',
              maxLiftingCapacity: string ='',
              maxVelocity: string = '',
              length: string = '',
              width: string = '',
              height: string = '',
              turningRadius: string = '',
              propulsionType: PropulsionType = new PropulsionType(),
              batteryType: BatteryType = new BatteryType()) {
    this.name = name;
    this.maxLiftingCapacity = maxLiftingCapacity;
    this.maxVelocity = maxVelocity;
    this.length = length;
    this.width = width;
    this.height = height;
    this.turningRadius = turningRadius;
    this.propulsionType = propulsionType;
    this.batteryType = batteryType;
  }
}
