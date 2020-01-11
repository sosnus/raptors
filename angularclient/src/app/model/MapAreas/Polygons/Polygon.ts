import {UniversalPoint} from "../UniversalPoint";
import {AreaType} from "../../type/AreaType";

export class Polygon{
  name: string;
  type: AreaType;
  points: UniversalPoint[];

  constructor(name: string, type: AreaType, points: UniversalPoint[]) {
    this.name = name;
    this.points = points;
    this.type = type;
  }
}
