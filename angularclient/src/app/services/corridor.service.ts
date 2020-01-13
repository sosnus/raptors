import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Corridor} from "../model/MapAreas/Corridors/Corridor";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CorridorService {
  private readonly corridorURL: string;

  constructor(private http: HttpClient) {
    this.corridorURL = 'http://localhost:8080/movement/corridors/';
  }

  public getCorridors(): Observable<Corridor[]> {
    return this.http.get<Corridor[]>(this.corridorURL + 'all', {responseType: 'json'});
  }

  public getCorridor(id: string): Observable<Corridor> {
    return this.http.get<Corridor>(this.corridorURL + id, {responseType: 'json'});
  }

  public save(corridor: Corridor) {
    return this.http.post<Corridor>(this.corridorURL + 'add', corridor);
  }

}
