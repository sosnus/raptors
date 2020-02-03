import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {MovementPath} from "../model/MapAreas/MovementPaths/MovementPath";
import {Injectable} from "@angular/core";
import {StoreService} from "./store.service";


@Injectable({
  providedIn: 'root'
})
export class MovementPathService {
  private readonly movementPathURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.movementPathURL = store.baseURL + '/movement/movement-paths/';
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

  public deleteByID(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + sessionStorage.getItem('token',)
      })
    };
    return this.http.delete(this.movementPathURL + 'delete/' + id, httpOptions);
  }

}
