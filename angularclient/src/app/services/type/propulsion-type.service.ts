import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PropulsionType} from "../../model/type/PropulsionType";

@Injectable({
  providedIn: 'root'
})
export class PropulsionTypeService {

  private readonly propulsionTypeURL: string;

  constructor(private http: HttpClient) {
    this.propulsionTypeURL = 'http://localhost:8080/type/propulsion-types/';
  }

  public getAll(): Observable<PropulsionType[]> {
    return this.http.get<PropulsionType[]>(this.propulsionTypeURL + "all", {responseType: 'json'})
  }

  public save(propulsionType: PropulsionType) {
    return this.http.post<PropulsionType>(this.propulsionTypeURL + 'add', propulsionType);
  }

  public delete(propulsionType: PropulsionType) {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: propulsionType};
    return this.http.delete(this.propulsionTypeURL + 'delete', httpOptions);
  }

}
