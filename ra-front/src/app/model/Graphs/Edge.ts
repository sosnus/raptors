import { Vertex } from './Vertex';

export class Edge{
  id: string;
  vertexA: Vertex;
  vertexB: Vertex;
  biDirected: boolean;
  narrow: boolean;
  isActive: boolean;

  constructor(vertexA: Vertex, vertexB: Vertex, biDirected: boolean, narrow: boolean, isActive: boolean) {
    this.vertexA = vertexA;
    this.vertexB = vertexB;
    this.biDirected = biDirected;
    this.narrow = narrow;
    this.isActive = isActive;
  }
}
