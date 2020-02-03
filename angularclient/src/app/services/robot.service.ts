import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Robot} from '../model/Robots/Robot';
import {StoreService} from "./store.service";

@Injectable({
  providedIn: 'root'
})

export class RobotService {

  private readonly robotIP: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.robotIP = store.baseURL + '/robots/';
  }

  public getRobots(): Observable<Robot[]> {
    return this.http.get<Robot[]>(this.robotIP + 'all', {responseType: 'json'})
  }

  public getRobot(id: string): Observable<Robot> {
    return this.http.get<Robot>(this.robotIP + id, {responseType: 'json'})
  }

  public save(robot: Robot) {
    return this.http.post<Robot>(this.robotIP + 'add', robot);
  }


}
