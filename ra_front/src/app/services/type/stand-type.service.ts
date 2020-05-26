import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StandType} from "../../model/type/StandType";
import {StoreService} from "../store.service";

@Injectable({
  providedIn: 'root'
})
export class StandTypeService {

  private readonly standTypeURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.standTypeURL = store.baseURL + '/type/stand-types/';
  }

  public getByID(id: string): Observable<StandType> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<StandType>(this.standTypeURL + id, {headers: headers, responseType: 'json'})
  }

  public getAll(): Observable<StandType[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<StandType[]>(this.standTypeURL + "all", {headers: headers, responseType: 'json'})
  }

  public save(standType: StandType) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<StandType>(this.standTypeURL + 'add', standType, {headers: headers});
  }

  public delete(standType: StandType) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + sessionStorage.getItem('token')
      }), body: standType
    };
    return this.http.delete(this.standTypeURL + 'delete', httpOptions);
  }
}
