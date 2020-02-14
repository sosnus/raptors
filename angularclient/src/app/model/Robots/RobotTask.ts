import {Robot} from "./Robot";
import {Behaviour} from "./Behaviour";
import {TaskPriority} from "../type/TaskPriority";

export class RobotTask {
  id: string;
  robot: Robot;
  name: string;
  behaviours: Behaviour[];
  startTime: string;
  priority: TaskPriority;
  status: string;
  userID: string;

  constructor(robot: Robot, name: string, behaviours: Behaviour[], startTime: string, priority: TaskPriority, status: string, userID: string) {
    this.robot = robot;
    this.name = name;
    this.behaviours = behaviours;
    this.startTime = startTime;
    this.priority = priority;
    this.status = status;
    this.userID = userID;
  }
}
