import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {BatteryType} from "../../model/type/BatteryType";

@Injectable({
  providedIn: 'root'
})
export class BatteryTypeService {

  private readonly batteryTypeURL: string;

  constructor(private http: HttpClient) {
    this.batteryTypeURL = 'http://localhost:8080/robots/battery-types/';
  }

  public getByID(id: string): Observable<BatteryType> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<BatteryType>(this.batteryTypeURL + id, {headers: headers, responseType: 'json'})
  }

  public getAll(): Observable<BatteryType[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<BatteryType[]>(this.batteryTypeURL + "all", {headers: headers, responseType: 'json'})
  }

  public save(batteryType: BatteryType) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<BatteryType>(this.batteryTypeURL + 'add', batteryType, {headers: headers});
  }

  public delete(batteryType: BatteryType) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + sessionStorage.getItem('token')
      }), body: batteryType
    };
    return this.http.delete(this.batteryTypeURL + 'delete', httpOptions);
  }
}
