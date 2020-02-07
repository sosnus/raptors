import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {StoreService} from "./store.service";
import {Log} from "../model/Robots/Log";

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private readonly logURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.logURL = store.baseURL + '/logs/';
  }

  public getLogsFromRobot(robotID: string): Observable<Log[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Log[]>(this.logURL + 'robot/'+robotID, {headers: headers, responseType: 'json'});
  }

  public GetLog(id: string): Observable<Log> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Log>(this.logURL + id, {headers: headers, responseType: 'json'});
  }

  public save(log: Log) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<Log>(this.logURL + 'add', log, {headers: headers});
  }

  public deleteByID(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + sessionStorage.getItem('token',)
      })
    };
    return this.http.delete(this.logURL + 'delete/' + id, httpOptions);
  }
}
