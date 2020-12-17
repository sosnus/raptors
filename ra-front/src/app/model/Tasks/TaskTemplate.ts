import {Behaviour} from "../Robots/Behaviour";
import {TaskPriority} from "../type/TaskPriority";

export class TaskTemplate {
  id: string;
  name: string;
  behaviours: Behaviour[];
  priority: TaskPriority;
  kioskId: string;


  // tslint:disable-next-line:max-line-length
  constructor(name: string, behaviours: Behaviour[], priority: TaskPriority, kioskId: string) {
    this.name = name;
    this.behaviours = behaviours;
    this.priority = priority;
    this.kioskId = kioskId;
  }
}
