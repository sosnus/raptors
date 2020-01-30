import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Polygon} from "../model/MapAreas/Polygons/Polygon";

@Injectable({
  providedIn: 'root'
})
export class PolygonService {
  private readonly polygonURL: string;

  constructor(private http: HttpClient) {
    this.polygonURL = 'http://localhost:8080/movement/map-areas/';
  }

  public getPolygons(): Observable<Polygon[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Polygon[]>(this.polygonURL + 'all', {headers: headers, responseType: 'json'})
  }

  public getPolygon(id: string): Observable<Polygon> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Polygon>(this.polygonURL + id, {headers: headers, responseType: 'json'})
  }

  public save(polygon: Polygon) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<Polygon>(this.polygonURL + 'add', polygon, {headers: headers});
  }

  public delete(polygon: Polygon) {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: polygon};
    return this.http.delete(this.polygonURL + 'delete', httpOptions);
  }

}
