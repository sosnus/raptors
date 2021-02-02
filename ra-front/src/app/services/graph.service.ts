import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Graph} from '../model/Graphs/Graph';
import {StoreService} from "./store.service";

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private readonly graphURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.graphURL = store.baseURL + '/graphs/';
  }

  public getGraph(id: string): Observable<Graph> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Graph>(this.graphURL + id, {headers: headers, responseType: 'json'})
  }

  public getAll(): Observable<Graph[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Graph[]>(this.graphURL + 'all', {headers: headers, responseType: 'json'})
  }

  public save(graph: Graph) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<Graph>(this.graphURL + 'add', graph, {headers: headers});
  }

  public delete(graph: Graph) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + sessionStorage.getItem('token',)
      }), body: graph, responseType: 'text' as 'json'
    };
    return this.http.delete(this.graphURL + 'delete', httpOptions);
  }

  public deleteByID(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + sessionStorage.getItem('token',)
      })
    };
    return this.http.delete(this.graphURL + 'delete/' + id, httpOptions);
  }

  public getAllByMapId(mapId: string): Observable<Graph[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Graph[]>(this.graphURL + "map-id/" + mapId, {headers: headers, responseType: 'json'})
  }
}
