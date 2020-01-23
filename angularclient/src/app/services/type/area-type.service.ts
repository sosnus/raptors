import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AreaType} from "../../model/type/AreaType";

@Injectable({
  providedIn: 'root'
})
export class AreaTypeService {

  private readonly areaTypeURL: string;
  constructor(private http: HttpClient) {
    this.areaTypeURL = 'http://localhost:8080/type/area-types/';
  }

  public getByID(id: string): Observable<AreaType> {
    const headers = {'Authorization': 'Basic ' +  sessionStorage.getItem('token')};
    return this.http.get<AreaType>(this.areaTypeURL + id, {headers:headers, responseType: 'json'})
  }

  public getAll(): Observable<AreaType[]> {
    const headers = {'Authorization': 'Basic ' +  sessionStorage.getItem('token')};
    return this.http.get<AreaType[]>(this.areaTypeURL + "all", {headers:headers, responseType: 'json'})
  }

  public save(areaType: AreaType) {
    const headers = {'Authorization': 'Basic ' +  sessionStorage.getItem('token')};
    return this.http.post<AreaType>(this.areaTypeURL + 'add', areaType,{headers:headers});
  }

  public delete(areaType: AreaType) {
    const httpOptions = {headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'Authorization': 'Basic ' +  sessionStorage.getItem('token')}), body: areaType};
    return this.http.delete(this.areaTypeURL + 'delete', httpOptions);
  }
}
