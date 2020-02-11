import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StoreService} from "./store.service";
import {RobotToApprove} from "../model/Robots/RobotToApprove";

@Injectable({
  providedIn: 'root'
})

export class RobotaApprovalService {

  private readonly robotApproveURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.robotApproveURL = store.baseURL + '/robots-temp/';
  }

  public getByID(id: string): Observable<RobotToApprove> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<RobotToApprove>(this.robotApproveURL + id, {headers: headers, responseType: 'json'})
  }

  public getAll(): Observable<RobotToApprove[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<RobotToApprove[]>(this.robotApproveURL + "all", {headers: headers, responseType: 'json'})
  }

  public approve(robotToApprove: RobotToApprove) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<RobotToApprove>(this.robotApproveURL + 'approve', robotToApprove, {headers: headers});
  }

  public delete(robotToApprove: RobotToApprove) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + sessionStorage.getItem('token')
      }), body: robotToApprove
    };
    return this.http.delete(this.robotApproveURL + 'delete', httpOptions);
  }
}
