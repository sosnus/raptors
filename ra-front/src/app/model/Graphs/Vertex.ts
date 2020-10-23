export class Vertex{
  id: string;
  posX: number;
  posY: number;
  name: string;
  poiID: string;
  type: number;

  constructor(posX: number, posY: number, poiID: string, type: number) {
    this.posX = posX;
    this.posY = posY;
    this.poiID = poiID;
    this.type = type;
  }
}
