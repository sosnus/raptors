import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RobotTask} from "../model/Robots/RobotTask";

@Injectable({
  providedIn: 'root'
})
export class RobotTaskService {
  private readonlyrobotTaskURL: string;

  constructor(private http: HttpClient) {
    this.readonlyrobotTaskURL = 'http://localhost:8080/robots/tasks/';
  }

  public getRobotTasks(): Observable<RobotTask[]> {
    return this.http.get<RobotTask[]>(this.readonlyrobotTaskURL + 'all', {responseType: 'json'})
  }

  public getRobotTask(id: string): Observable<RobotTask> {
    return this.http.get<RobotTask>(this.readonlyrobotTaskURL + id, {responseType: 'json'})
  }

  public save(robotTask: RobotTask) {
    return this.http.post<RobotTask>(this.readonlyrobotTaskURL + 'add', robotTask);
  }

  public delete(robotTask: RobotTask) {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: robotTask};
    return this.http.delete(this.readonlyrobotTaskURL + 'delete', httpOptions);
  }

}
