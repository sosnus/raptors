import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { StoreService } from "./store.service";
import {Maps} from "../model/mapsMetadata/Maps";

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private readonly mapsURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.mapsURL = store.baseURL + '/movement/maps/new/';
  }

  public getAll() {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Maps[]>(this.mapsURL + 'all', {headers: headers, responseType: 'json'});
  }

  updateMaps(noweInformacje) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<Maps>(this.mapsURL + 'add', noweInformacje, {headers: headers});
  }

}
