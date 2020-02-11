
import {UniversalPoint} from "../UniversalPoint";

export class MovementPath {
  id: string;
  name: string;
  points:UniversalPoint[];
  startStandId:string;
  finishStandId:string;


  constructor(id: string, name: string, points: UniversalPoint[], startStandId: string, finishStandId: string) {
    this.id = id;
    this.name = name;
    this.points = points;
    this.startStandId = startStandId;
    this.finishStandId = finishStandId;
  }
}
