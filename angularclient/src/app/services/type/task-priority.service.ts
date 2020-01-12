import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TaskPriority} from "../../model/type/TaskPriority";


@Injectable({
  providedIn: 'root'
})
export class TaskPriorityService {

  private readonly taskPriorityURL: string;

  constructor(private http: HttpClient) {
    this.taskPriorityURL = 'http://localhost:8080/type/task-priorities/';
  }

  public getAll(): Observable<TaskPriority[]> {
    return this.http.get<TaskPriority[]>(this.taskPriorityURL + "all", {responseType: 'json'})
  }

  public save(taskPriority: TaskPriority) {
    return this.http.post<TaskPriority>(this.taskPriorityURL + 'add', taskPriority);
  }

  public delete(taskPriority: TaskPriority) {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: taskPriority};
    return this.http.delete(this.taskPriorityURL + 'delete', httpOptions);
  }

}
