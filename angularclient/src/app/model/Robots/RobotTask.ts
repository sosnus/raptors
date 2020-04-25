import {Robot} from "./Robot";
import {Behaviour} from "./Behaviour";
import {TaskPriority} from "../type/TaskPriority";
import {StatusType} from "./StatusType"

export class RobotTask {
  id: string;
  robot: Robot;
  name: string;
  behaviours: Behaviour[];
  startTime: string;
  priority: TaskPriority;
  status: StatusType;
  userID: string;


  // tslint:disable-next-line:max-line-length
  constructor(robot: Robot, name: string, behaviours: Behaviour[], startTime: string, priority: TaskPriority, status: StatusType, userID: string) {
    this.robot = robot;
    this.name = name;
    this.behaviours = behaviours;
    this.startTime = startTime;
    this.priority = priority;
    this.status = status;
    this.userID = userID;
  }
}
