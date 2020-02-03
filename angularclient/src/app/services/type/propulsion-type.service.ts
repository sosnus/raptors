import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PropulsionType} from "../../model/type/PropulsionType";
import {StoreService} from "../store.service";

@Injectable({
  providedIn: 'root'
})
export class PropulsionTypeService {

  private readonly propulsionTypeURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.propulsionTypeURL = store.baseURL + '/type/propulsion-types/';
  }

  public getAll(): Observable<PropulsionType[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<PropulsionType[]>(this.propulsionTypeURL + "all", {headers: headers, responseType: 'json'})
  }

  public save(propulsionType: PropulsionType) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<PropulsionType>(this.propulsionTypeURL + 'add', propulsionType, {headers: headers});
  }

  public delete(propulsionType: PropulsionType) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + sessionStorage.getItem('token')
      }), body: propulsionType
    };
    return this.http.delete(this.propulsionTypeURL + 'delete', httpOptions);
  }

}
