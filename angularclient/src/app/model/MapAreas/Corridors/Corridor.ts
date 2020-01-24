import {UniversalPoint} from "../UniversalPoint";

export class Corridor {
  id: string;
  name: string;
  movementPathId: string;
  points: UniversalPoint[];


  constructor(name: string, movementPathId: string, points: UniversalPoint[]) {
    this.name = name;
    this.movementPathId = movementPathId;
    this.points = points;
  }
}
