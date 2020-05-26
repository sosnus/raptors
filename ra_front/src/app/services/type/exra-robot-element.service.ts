import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StoreService} from "../store.service";
import {ExtraRobotElement} from "../../model/Robots/ExtraRobotElement";

@Injectable({
  providedIn: 'root'
})
export class ExtraRobotElementService {

  private readonly extraRobotElementURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.extraRobotElementURL = store.baseURL + '/robots/extra-elements/';
  }

  public getAll(): Observable<ExtraRobotElement[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<ExtraRobotElement[]>(this.extraRobotElementURL + "all", {headers: headers, responseType: 'json'})
  }

  public save(extraRobotElement: ExtraRobotElement) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<ExtraRobotElement>(this.extraRobotElementURL + 'add', extraRobotElement, {headers: headers});
  }

  public delete(extraRobotElement: ExtraRobotElement) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + sessionStorage.getItem('token')
      }), body: extraRobotElement
    };
    return this.http.delete(this.extraRobotElementURL + 'delete', httpOptions);
  }

}
