
import {UniversalPoint} from "../UniversalPoint";

export class MovementPath {
  id: string;
  name: string;
  points:UniversalPoint[];


  constructor(id: string, name: string, points: UniversalPoint[]) {
    this.id = id;
    this.name = name;
    this.points = points;
  }
}
