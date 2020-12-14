export class Vertex{
  id: string;
  posX: number;
  posY: number;
  name: string;
  poiID: string;
  nodeID: number;
  type: number;

  constructor(posX: number, posY: number, poiID: string, nodeID: number ,type: number) {
    this.posX = posX;
    this.posY = posY;
    this.poiID = poiID;
    this.nodeID = nodeID;
    this.type = type;
  }
}
