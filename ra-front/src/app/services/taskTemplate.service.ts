import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TaskTemplate} from "../model/Tasks/TaskTemplate";
import {StoreService} from "./store.service";


@Injectable({
  providedIn: 'root'
})
export class TaskTemplateService {
  private readonlyrobotTaskTemplateURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.readonlyrobotTaskTemplateURL = store.baseURL + '/tasks/templates/';
  }

  public getRobotTasks(): Observable<TaskTemplate[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<TaskTemplate[]>(this.readonlyrobotTaskTemplateURL + 'all', {headers: headers, responseType: 'json'})
  }

  public getRobotTask(id: string): Observable<TaskTemplate> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<TaskTemplate>(this.readonlyrobotTaskTemplateURL + id, {headers: headers, responseType: 'json'})
  }

  public save(taskTemplate: TaskTemplate) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<TaskTemplate>(this.readonlyrobotTaskTemplateURL + 'add', taskTemplate, {headers: headers});
  }

  public delete(taskTemplate: TaskTemplate) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + sessionStorage.getItem('token',)
      }), body: taskTemplate, responseType: 'text' as 'json'
    };
    return this.http.delete(this.readonlyrobotTaskTemplateURL + 'delete', httpOptions);
  }

  public getTasksListForUsersList(usersIDsList: string[]): Observable<TaskTemplate[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<TaskTemplate[]>(this.readonlyrobotTaskTemplateURL + 'get-list', usersIDsList, {headers: headers})
  }

}
