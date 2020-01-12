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
    return this.http.get<BatteryType>(this.batteryTypeURL + id, {responseType: 'json'})
  }

  public getAll(): Observable<BatteryType[]> {
    return this.http.get<BatteryType[]>(this.batteryTypeURL + "all", {responseType: 'json'})
  }

  public save(batteryType: BatteryType) {
    return this.http.post<BatteryType>(this.batteryTypeURL + 'add', batteryType);
  }

  public delete(batteryType: BatteryType) {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: batteryType};
    return this.http.delete(this.batteryTypeURL + 'delete', httpOptions);
  }
}
