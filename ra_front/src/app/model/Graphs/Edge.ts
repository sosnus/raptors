import { Vertex } from './Vertex';

export class Edge{
  id: string;
  vertexA: Vertex;
  vertexB: Vertex;
  biDirected: boolean;

  constructor(vertexA: Vertex, vertexB: Vertex, biDirected: boolean) {
    this.vertexA = vertexA;
    this.vertexB = vertexB;
    this.biDirected = biDirected;
  }
}
