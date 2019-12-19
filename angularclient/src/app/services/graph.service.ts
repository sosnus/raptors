import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Map } from '../model/Map';
import { Graph } from '../model/Graphs/Graph';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private readonly graphURL: string;

  constructor(private http: HttpClient) {
    this.graphURL = 'http://localhost:8080/graphs/';
  }

  public save(graph: Graph) {
    return this.http.post<Graph>(this.graphURL + 'add', graph);
  }
}
