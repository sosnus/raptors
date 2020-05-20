import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreService} from './store.service';
import {InstanceInfo} from '../model/Settings/InstanceInfo';
import {CurrentMap} from '../model/Settings/CurrentMap';
import {ContactInfo} from '../model/Settings/ContactInfo';

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
    // const headers = {Authorization: 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<CurrentMap>(this.url + 'getCurrentMap');
  }

  getContactInfo() {
    // const headers = {Authorization: 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<ContactInfo[]>(this.url + 'getContactInfo');
  }

  updateInstanceInfo(nowaInstancja) {
    // const headers = {Authorization: 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<InstanceInfo>(this.url + 'updateInstanceInfo', nowaInstancja);
  }

  updateContactInfo(noweInformacje) {
    // const headers = {Authorization: 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<ContactInfo[]>(this.url + 'updateContactInfo', noweInformacje);
  }
}
