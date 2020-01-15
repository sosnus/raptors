import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RobotModel} from "../../model/Robots/RobotModel";

@Injectable({
  providedIn: 'root'
})
export class RobotModelService {

  private readonly robotModelsURL: string;

  constructor(private http: HttpClient) {
    this.robotModelsURL = 'http://localhost:8080/robots/models/';
  }

  public getByID(id: string): Observable<RobotModel> {
    return this.http.get<RobotModel>(this.robotModelsURL + id, {responseType: 'json'})
  }

  public getAll(): Observable<RobotModel[]> {
    return this.http.get<RobotModel[]>(this.robotModelsURL + "all", {responseType: 'json'})
  }

  public save(robotModel: RobotModel) {
    return this.http.post<RobotModel>(this.robotModelsURL + 'add', robotModel);
  }

  public delete(robotModel: RobotModel) {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: robotModel};
    return this.http.delete(this.robotModelsURL + 'delete', httpOptions);
  }
}
