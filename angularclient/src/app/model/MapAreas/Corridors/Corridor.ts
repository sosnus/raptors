import {MovementPath} from '../MovementPaths/MovementPath';

export class Corridor {
  id: string
  name: string;
  movementPath: MovementPath;

  constructor(id: string, name: string, movementPath: MovementPath) {
    this.id = id;
    this.name = name;
    this.movementPath = movementPath;
  }
}
