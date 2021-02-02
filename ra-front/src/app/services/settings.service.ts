import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreService} from './store.service';
import {InstanceInfo} from '../model/Settings/InstanceInfo';
import {MapInfo} from '../model/Settings/MapInfo';
import {ContactInfo} from '../model/Settings/ContactInfo';
import {ContactInfos} from '../model/Settings/ContactInfos';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private readonly url: string;
  // x: any;

  constructor(private http: HttpClient, private store: StoreService) {
    this.url = store.baseURL + '/settings/';
  }

  getInstanceInfo() {
    // const headers = {Authorization: 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<InstanceInfo>(this.url + 'getInstanceInfo');
  }

  getCurrentMap() {
    const headers = {Authorization: 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<MapInfo>(this.url + 'getCurrentMap');
  }

  getContactInfo() {
    // const headers = {Authorization: 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<ContactInfo[]>(this.url + 'getContactInfo');
  }

  updateInstanceInfo(nowaInstancja) {
    // const headers = {Authorization: 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<InstanceInfo>(this.url + 'updateInstanceInfo', nowaInstancja);
  }

  updateCurrentMap(mapId) {
    const headers = {Authorization: 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<MapInfo>(this.url + 'updateCurrentMap/' + mapId, {headers: headers, responseType: 'json'});
  }

  updateContactInfo(noweInformacje) {
    // const headers = {Authorization: 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<ContactInfo[]>(this.url + 'updateContactInfo', noweInformacje);
  }
}
