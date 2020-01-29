import {RobotModel} from "./RobotModel";
import {Pose} from "../Stand/Pose";
import {RobotStatus} from "./RobotStatus";
import {RobotBattery} from "./RobotBattery";
import {ExtraRobotElement} from "./ExtraRobotElement";

export class Robot{
  id: string;
  robotIp: string;
  available: boolean;
  extraRobotElement: ExtraRobotElement;
  model: RobotModel;
  battery: RobotBattery;
  pose: Pose;
  batteryLevel: number;
  status: RobotStatus[];
  timestamp: string;

  constructor(robotIp: string, available: boolean, extraRobotElement: ExtraRobotElement, model: RobotModel, battery: RobotBattery, pose: Pose, batteryLevel: number, status: RobotStatus[], timestamp: string) {
    this.robotIp = robotIp;
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

