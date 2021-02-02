import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Kiosk} from "../model/Kiosk/Kiosk";
import {StoreService} from "./store.service";

@Injectable({
  providedIn: 'root'
})

export class KioskService {

  private readonly kioskURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.kioskURL = store.baseURL + '/kiosks/';
  }

  public getStand(id: string): Observable<Kiosk> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Kiosk>(this.kioskURL + id, {headers: headers, responseType: 'json'})
  }

  public getAll(): Observable<Kiosk[]> {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.get<Kiosk[]>(this.kioskURL + "all", {headers: headers, responseType: 'json'})
  }

  public save(kiosk: Kiosk) {
    const headers = {'Authorization': 'Basic ' + sessionStorage.getItem('token')};
    return this.http.post<Kiosk>(this.kioskURL + 'add', kiosk, {headers: headers});
  }

  public delete(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + sessionStorage.getItem('token',)
      })
    };
    return this.http.delete(this.kioskURL + 'delete/' + id, httpOptions);
  }
}
