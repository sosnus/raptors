import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RobotTask} from "../model/Robots/RobotTask";
import {StoreService} from "./store.service";


@Injectable({
  providedIn: 'root'
})
export class RobotTaskService {
  private readonlyrobotTaskURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.readonlyrobotTaskURL = store.baseURL + '/robots/tasks/';
  }

  public getRobotTasks(): Observable<RobotTask[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<RobotTask[]>(this.readonlyrobotTaskURL + 'all', {headers: headers, responseType: 'json'})
  }

  public getRobotTask(id: string): Observable<RobotTask> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<RobotTask>(this.readonlyrobotTaskURL + id, {headers: headers, responseType: 'json'})
  }

  public save(robotTask: RobotTask) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<RobotTask>(this.readonlyrobotTaskURL + 'add', robotTask, {headers: headers});
  }

  public delete(robotTask: RobotTask) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + sessionStorage.getItem('token',)
      }), body: robotTask, responseType: 'text' as 'json'
    };
    return this.http.delete(this.readonlyrobotTaskURL + 'delete', httpOptions);
  }

}
