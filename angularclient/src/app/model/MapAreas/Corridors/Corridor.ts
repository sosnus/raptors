export class Corridor {
  id: string;
  name: string;
  movementPathId: string;
  pointsList: [];


  constructor(name: string, movementPathId: string, pointsList: []) {
    this.name = name;
    this.movementPathId = movementPathId;
    this.pointsList = pointsList;
  }
}
