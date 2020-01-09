import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Polygon} from "../model/MapAreas/Polygons/Polygon";

@Injectable({
  providedIn: 'root'
})
export class PolygonService {
  private readonly polygonURL: string;

  constructor(private http: HttpClient) {
    this.polygonURL = 'http://localhost:8080//movement/map-areas/';
  }

  public getPolygons(): Observable<Polygon[]> {
    return this.http.get<Polygon[]>(this.polygonURL + 'all', {responseType: 'json'})
  }

  public getPolygon(id: string): Observable<Polygon> {
    return this.http.get<Polygon>(this.polygonURL + id, {responseType: 'json'})
  }

  public save(polygon: Polygon) {
    return this.http.post<Polygon>(this.polygonURL + 'add', polygon);
  }

}
