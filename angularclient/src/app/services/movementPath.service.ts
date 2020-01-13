import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MovementPath} from "../model/MapAreas/MovementPaths/MovementPath";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class MovementPathService {
  private readonly movementPathURL: string;

  constructor(private http: HttpClient) {
    this.movementPathURL = 'http://localhost:8080/movement/movement-paths/';
  }

  public getMovementPaths(): Observable<MovementPath[]> {
    return this.http.get<MovementPath[]>(this.movementPathURL + 'all', {responseType: 'json'});
  }

  public getMovementPath(id: string): Observable<MovementPath> {
    return this.http.get<MovementPath>(this.movementPathURL + id, {responseType: 'json'});
  }

  public save(movementPath: MovementPath) {
    return this.http.post<MovementPath>(this.movementPathURL + 'add', movementPath);
  }

}
