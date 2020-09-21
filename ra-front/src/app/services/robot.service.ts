import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Robot} from '../model/Robots/Robot';
import {StoreService} from "./store.service";

@Injectable({
  providedIn: 'root'
})

export class RobotService {

  private readonly robotURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.robotURL = store.baseURL + '/robots/';
  }

  public getAll(): Observable<Robot[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Robot[]>(this.robotURL + 'all', {headers: headers, responseType: 'json'})
  }

  public getRawByID(id: string): Observable<object> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get(this.robotURL + id, {headers: headers, responseType: 'json'});
  }

  public getByID(id: string): Observable<Robot> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Robot>(this.robotURL + id, {headers: headers, responseType: 'json'})
  }

  public save(robot: Robot, password: string) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<Robot>(this.robotURL + 'add?password=' + password, robot, {headers: headers});
  }

  public update(robot: Robot, password: string = null) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<Robot>(this.robotURL + 'update?password=' + password, robot, {headers: headers});
  }

  public delete(robot: Robot) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + sessionStorage.getItem('token')
      }), body: robot
    };
    return this.http.delete(this.robotURL + 'delete', httpOptions);
  }
}
