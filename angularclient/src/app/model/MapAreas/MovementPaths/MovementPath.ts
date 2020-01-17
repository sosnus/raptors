
import {Graph} from "../../Graphs/Graph";

export class MovementPath {
  id: string;
  name: string;
  graph:Graph;


  constructor(name: string, graph: Graph) {
    this.name = name;
    this.graph = graph;
  }
}
