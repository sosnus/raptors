import {UniversalPoint} from "../UniversalPoint";
import {AreaType} from "../AreaType";

export class Polygon{
  id: string;
  name: string;
  type: AreaType;
  points: UniversalPoint[];

  constructor(id: string, name: string, type: AreaType, points: UniversalPoint[]) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.points = points;
  }
}
