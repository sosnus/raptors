import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TaskPriority} from "../../model/type/TaskPriority";
import {StoreService} from "../store.service";


@Injectable({
  providedIn: 'root'
})
export class TaskPriorityService {

  private readonly taskPriorityURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.taskPriorityURL = store.baseURL + '/type/task-priorities/';
  }

  public getAll(): Observable<TaskPriority[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<TaskPriority[]>(this.taskPriorityURL + "all", {headers: headers, responseType: 'json'})
  }

  public save(taskPriority: TaskPriority) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<TaskPriority>(this.taskPriorityURL + 'add', taskPriority, {headers: headers});
  }

  public delete(taskPriority: TaskPriority) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + sessionStorage.getItem('token')
      }), body: taskPriority
    };
    return this.http.delete(this.taskPriorityURL + 'delete', httpOptions);
  }

}
