import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Map} from '../model/Map';
import {MapInfo} from "../model/Settings/MapInfo";
import {StoreService} from "./store.service";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private readonly mapURL: string;
  private readonly minioURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.mapURL = store.baseURL + '/movement/maps/';
    this.minioURL = store.baseURL + '/movement/maps/minio/';
  }

  public getMap(id: string): Observable<any> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get(this.mapURL + 'jpg/' + id, {headers: headers, responseType: 'text'})
  }

  public getMapsInfo() {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<MapInfo[]>(this.mapURL + 'list', {headers: headers, responseType: 'json'});
  }

  public save(name: string, map: File, yaml: File) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    const formData = new FormData();
    formData.append('name', name);
    formData.append('mapImage', map);
    formData.append('yamlFile', yaml);
    // return this.http.post<any>(this.mapURL + 'upload', formData, {headers: headers});
     return this.http.post<any>(this.minioURL + 'upload', formData, {headers: headers});
  }
}
