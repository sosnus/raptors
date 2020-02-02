import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Stand} from "../model/Stand/Stand";
import {StoreService} from "./store.service";

@Injectable({
  providedIn: 'root'
})

export class StandService {

  private readonly standURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.standURL = store.baseURL + '/movement/stands/';
  }

  public getStand(id: string): Observable<Stand> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Stand>(this.standURL + id, {headers: headers, responseType: 'json'})
  }

  public getAll(): Observable<Stand[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Stand[]>(this.standURL + "all", {headers: headers, responseType: 'json'})
  }

  public save(stand: Stand) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<Stand>(this.standURL + 'add', stand, {headers: headers});
  }

  public delete(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + sessionStorage.getItem('token',)
      })
    };
    return this.http.delete(this.standURL + 'delete/' + id, httpOptions);
  }
}
