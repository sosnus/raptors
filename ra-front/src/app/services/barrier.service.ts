import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { StoreService } from "./store.service";
import { UniversalPoint } from "../model/MapAreas/UniversalPoint";
import { Polygon } from "../model/MapAreas/Polygons/Polygon";

@Injectable({
  providedIn: "root",
})
export class BarrierService {
  private readonly barrierURL: string;

  constructor(private http: HttpClient, private store: StoreService) {
    this.barrierURL = store.barrierURL;
  }

  public getBarriers(robot_diameter: string): Observable<any> {
    return this.http.get(
      this.barrierURL +
        `dummy_map?map_file_name=${this.store.mapID}&map_folder_name=${this.store.mapID}&robot_diameter=${robot_diameter}`,
      { responseType: "text" }
    );
  }

  public parseToPolygons(barriers, area) {
    var polygons = [];
    barriers = barriers.split("p");
    var i = 0;
    barriers.forEach((element) => {
      var a = element.split("|");
      var b = [];
      a.forEach((ae) => {
        var c = ae.split(",");
        b.push(new UniversalPoint(parseInt(c[0]), parseInt(c[1]), 0));
      });
      polygons.push(new Polygon(`Barrier${i}`, area, b));
      i += 1;
    });
    return polygons;
  }
}
