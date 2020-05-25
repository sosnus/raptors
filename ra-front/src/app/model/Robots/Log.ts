import {RobotStatus} from "./RobotStatus";

export class Log {
  id: string;
  timestamp: string;
  status: RobotStatus;


  constructor(timestamp: string, status: RobotStatus) {
    this.timestamp = timestamp;
    this.status = status;
  }
}
