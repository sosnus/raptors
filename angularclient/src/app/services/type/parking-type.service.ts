import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ParkingType} from "../../model/type/ParkingType";

@Injectable({
  providedIn: 'root'
})
export class ParkingTypeService {

  private readonly parkingTypeURL: string;

  constructor(private http: HttpClient) {
    this.parkingTypeURL = 'http://localhost:8080/type/parking-types/';
  }

  public getAll(): Observable<ParkingType[]> {
    return this.http.get<ParkingType[]>(this.parkingTypeURL + "all", {responseType: 'json'})
  }

  public save(parkingType: ParkingType) {
    return this.http.post<ParkingType>(this.parkingTypeURL + 'add', parkingType);
  }

  public delete(parkingType: ParkingType) {
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: parkingType};
    return this.http.delete(this.parkingTypeURL + 'delete', httpOptions);
  }

}
