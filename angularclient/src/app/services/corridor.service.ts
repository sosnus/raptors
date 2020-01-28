import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Corridor[]>(this.corridorURL + 'all', {headers: headers, responseType: 'json'});
  }

  public getCorridor(id: string): Observable<Corridor> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Corridor>(this.corridorURL + id, {headers: headers, responseType: 'json'});
  }

  public save(corridor: Corridor) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<Corridor>(this.corridorURL + 'add', corridor, {headers: headers});
  }

  public deleteByID(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + sessionStorage.getItem('token',)
      })
    };
    return this.http.delete(this.corridorURL + 'delete/'+id, httpOptions);
  }
}
