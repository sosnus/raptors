import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StandType} from "../../model/type/StandType";

@Injectable({
  providedIn: 'root'
})
export class StandTypeService {

  private readonly standTypeURL: string;

  constructor(private http: HttpClient) {
    this.standTypeURL = 'http://localhost:8080/type/stand-types/';
  }

  public getByID(id: string): Observable<StandType> {
    return this.http.get<StandType>(this.standTypeURL + id, {responseType: 'json'})
  }

  public getAll(): Observable<StandType[]> {
    return this.http.get<StandType[]>(this.standTypeURL + "all", {responseType: 'json'})
  }

  public save(standType: StandType) {
    return this.http.post<StandType>(this.standTypeURL + 'add', standType);
  }

  public delete(standType: StandType) {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: standType};
    return this.http.delete(this.standTypeURL + 'delete', httpOptions);
  }
}
