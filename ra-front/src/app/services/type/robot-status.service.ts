import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RobotStatus} from "../../model/Robots/RobotStatus";
import {StoreService} from "../store.service";

@Injectable({
  providedIn: 'root'
})
export class RobotStatusService {

  private readonly robotStatusesURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.robotStatusesURL = store.baseURL + '/type/robot-statuses/';
  }

  public getByID(id: string): Observable<RobotStatus> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<RobotStatus>(this.robotStatusesURL + id, {headers: headers, responseType: 'json'})
  }

  public getAll(): Observable<RobotStatus[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<RobotStatus[]>(this.robotStatusesURL + "all", {headers: headers, responseType: 'json'})
  }

  public save(robotStatus: RobotStatus) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<RobotStatus>(this.robotStatusesURL + 'add', robotStatus, {headers: headers});
  }

  public delete(robotStatus: RobotStatus) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + sessionStorage.getItem('token')
      }), body: robotStatus
    };
    return this.http.delete(this.robotStatusesURL + 'delete', httpOptions);
  }
}
