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
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<MovementPath[]>(this.movementPathURL + 'all', {headers: headers, responseType: 'json'});
  }

  public getMovementPath(id: string): Observable<MovementPath> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<MovementPath>(this.movementPathURL + id, {headers: headers, responseType: 'json'});
  }

  public save(movementPath: MovementPath) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<MovementPath>(this.movementPathURL + 'add', movementPath, {headers: headers});
  }

}
