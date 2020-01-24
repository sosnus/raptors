import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StandStatus} from "../../model/type/StandStatus";

@Injectable({
  providedIn: 'root'
})
export class StandStatusService {

  private readonly standStatusesURL: string;

  constructor(private http: HttpClient) {
    this.standStatusesURL = 'http://localhost:8080/type/stand-statuses/';
  }

  public getByID(id: string): Observable<StandStatus> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<StandStatus>(this.standStatusesURL + id, {headers: headers, responseType: 'json'})
  }

  public getAll(): Observable<StandStatus[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<StandStatus[]>(this.standStatusesURL + "all", {headers: headers, responseType: 'json'})
  }

  public save(standStatus: StandStatus) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<StandStatus>(this.standStatusesURL + 'add', standStatus, {headers: headers});
  }

  public delete(standStatus: StandStatus) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + sessionStorage.getItem('token')
      }), body: standStatus
    };
    return this.http.delete(this.standStatusesURL + 'delete', httpOptions);
  }
}
