import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Map } from '../model/Map';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private readonly mapURL: string;

  constructor(private http: HttpClient) {
    this.mapURL = 'http://localhost:8080/movement/maps/';
  }

  public getMap(id: string): Observable<any> {
    return this.http.get(this.mapURL + 'jpg/' + id, {responseType: 'text'})
  }

  public save(name: string,map: File, yaml: File) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('mapImage', map);
    formData.append('yamlFile', yaml);
    return this.http.post<any>(this.mapURL + 'upload', formData);
  }
}
