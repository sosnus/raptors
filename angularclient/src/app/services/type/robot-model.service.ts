import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RobotModel} from "../../model/Robots/RobotModel";
import {StoreService} from "../store.service";

@Injectable({
  providedIn: 'root'
})
export class RobotModelService {

  private readonly robotModelsURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.robotModelsURL = store.baseURL + '/robots/models/';
  }

  public getByID(id: string): Observable<RobotModel> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<RobotModel>(this.robotModelsURL + id, {headers: headers, responseType: 'json'})
  }

  public getAll(): Observable<RobotModel[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<RobotModel[]>(this.robotModelsURL + "all", {headers: headers, responseType: 'json'})
  }

  public save(robotModel: RobotModel) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<RobotModel>(this.robotModelsURL + 'add', robotModel, {headers: headers});
  }

  public delete(robotModel: RobotModel) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + sessionStorage.getItem('token')
      }), body: robotModel
    };
    return this.http.delete(this.robotModelsURL + 'delete', httpOptions);
  }
}
