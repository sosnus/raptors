import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AreaType} from "../../model/type/AreaType";

@Injectable({
  providedIn: 'root'
})
export class AreaTypeService {

  private readonly areaTypeURL: string;

  constructor(private http: HttpClient) {
    this.areaTypeURL = 'http://localhost:8080/type/area-types/';
  }

  public getByID(id: string): Observable<AreaType> {
    return this.http.get<AreaType>(this.areaTypeURL + id, {responseType: 'json'})
  }

  public getAll(): Observable<AreaType[]> {
    return this.http.get<AreaType[]>(this.areaTypeURL + "all", {responseType: 'json'})
  }

  public save(areaType: AreaType) {
    return this.http.post<AreaType>(this.areaTypeURL + 'add', areaType);
  }

  public delete(areaType: AreaType) {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: areaType};
    return this.http.delete(this.areaTypeURL + 'delete', httpOptions);
  }
}
