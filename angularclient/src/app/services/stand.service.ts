import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Graph} from "../model/Graphs/Graph";
import {Stand} from "../model/Stand/Stand";

@Injectable({
  providedIn: 'root'
})

export class StandService {

  private readonly standURL: string;

  constructor(private http: HttpClient) {
    this.standURL = 'http://localhost:8080//movement/stands/';
  }

  public getStand(id: string): Observable<Stand> {
    return this.http.get<Stand>(this.standURL + id, {responseType: 'json'})
  }

  public getAll(): Observable<Stand[]> {
    return this.http.get<Stand[]>(this.standURL + "all", {responseType: 'json'})
  }

  public save(stand: Stand) {
    return this.http.post<Stand>(this.standURL + 'add', stand);
  }

}
