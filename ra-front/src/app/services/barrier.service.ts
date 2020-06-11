import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {StoreService} from "./store.service";

@Injectable({
  providedIn: 'root'
})
export class BarrierService {

  private readonly barrierURL: string;

  constructor(private http: HttpClient,
              private store: StoreService) {
    this.barrierURL = store.barrierURL;
    console.log(this.store.mapID)
  }

  public getBarriers(robot_diameter: string): Observable<any> {
    return this.http.get(this.barrierURL + `?map_file_name=${this.store.mapID}&map_folder_name=${this.store.mapID}&robot_diameter=${robot_diameter}`, { responseType: 'text'})
  }
}
