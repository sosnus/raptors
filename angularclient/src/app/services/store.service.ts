import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Map } from '../model/Map';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public mapURL: string;
  public robotIDlist: any;
  public readonly robotIP: string;

  public mapResolution=0.01;
  public imageResolution=1984;
  public mapID = '5e19f1fa9b1eab79e9a58e08';

/*  public robotsObjects = [
    {
      id: '5dfb452fd9068433d5983610',
      robotIP: '10.21.129.22',
      available: true
    },
    {
      id: '5dfaa9b1501c23010c910a34',
      robotIP: '10.21.129.23',
      available: true
    },
    {
      id: '2',
      robotIP: '10.21.128.10',
      available: true
    }
  ];*/
  constructor(private http: HttpClient) {
    this.robotIDlist = 'http://localhost:8080/robots/allById'
    this.robotIP = 'http://localhost:8080/robots/';

  }

  public getRobotIDlist(): Observable<any> {
    return this.http.get(this.robotIDlist)
  }

  public getRobotIP(id: string): Observable<any> {
    return this.http.get(this.robotIP + id + '/ip/',{responseType: 'text'})
  }

/*  public getRobotIPfromList(id: string): Observable<any> {
    return this.http.get(this.robotIP + id + '/ip/' + ... ,{responseType: 'text'})
  }*/
}
