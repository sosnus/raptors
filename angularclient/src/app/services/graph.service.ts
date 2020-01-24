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

  public getGraph(id: string): Observable<Graph> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Graph>(this.graphURL + id, {headers: headers, responseType: 'json'})
  }

  public save(graph: Graph) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<Graph>(this.graphURL + 'add', graph,{headers: headers});
  }
}
