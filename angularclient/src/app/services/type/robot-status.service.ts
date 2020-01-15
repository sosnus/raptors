import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RobotStatus} from "../../model/Robots/RobotStatus";

@Injectable({
  providedIn: 'root'
})
export class RobotStatusService {

  private readonly robotStatusesURL: string;

  constructor(private http: HttpClient) {
    this.robotStatusesURL = 'http://localhost:8080/type/robot-statuses/';
  }

  public getByID(id: string): Observable<RobotStatus> {
    return this.http.get<RobotStatus>(this.robotStatusesURL + id, {responseType: 'json'})
  }

  public getAll(): Observable<RobotStatus[]> {
    return this.http.get<RobotStatus[]>(this.robotStatusesURL + "all", {responseType: 'json'})
  }

  public save(robotStatus: RobotStatus) {
    return this.http.post<RobotStatus>(this.robotStatusesURL + 'add', robotStatus);
  }

  public delete(robotStatus: RobotStatus) {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: robotStatus};
    return this.http.delete(this.robotStatusesURL + 'delete', httpOptions);
  }
}
