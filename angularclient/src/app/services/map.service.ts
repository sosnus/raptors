import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Map } from '../model/Map';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private readonly usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/movement/maps/';
  }

  public getMap(id: string): Observable<any> {
    return this.http.get<Map>(this.usersUrl + id);
  }
}
