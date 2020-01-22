
import {UniversalPoint} from "../UniversalPoint";

export class MovementPath {
  id: string;
  name: string;
  points:UniversalPoint[];


  constructor(name: string, points: UniversalPoint[]) {
    this.name = name;
    this.points = points;
  }
}
