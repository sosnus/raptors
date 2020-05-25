import {RobotModel} from "./RobotModel";
import {Pose} from "../Stand/Pose";
import {RobotStatus} from "./RobotStatus";
import {RobotBattery} from "./RobotBattery";
import {ExtraRobotElement} from "./ExtraRobotElement";

export class RobotToApprove{
  id: string;
  robotIp: string;
  password: string;
  available: boolean;
  extraRobotElement: ExtraRobotElement;
  model: RobotModel;
  battery: RobotBattery;
  pose: Pose;
  batteryLevel: number;
  status: RobotStatus[];
  timestamp: string;

  constructor(robotIp: string = '',
              password: string = '',
              available: boolean = false,
              extraRobotElement: ExtraRobotElement = new ExtraRobotElement(),
              model: RobotModel = new RobotModel(),
              battery: RobotBattery = new RobotBattery(),
              pose: Pose = new Pose(),
              batteryLevel: number = 0,
              status: RobotStatus[] = [],
              timestamp: string = '') {
    this.robotIp = robotIp;
    this.password = password;
    this.available = available;
    this.extraRobotElement = extraRobotElement;
    this.model = model;
    this.battery = battery;
    this.pose = pose;
    this.batteryLevel = batteryLevel;
    this.status = status;
    this.timestamp = timestamp;
  }
}

