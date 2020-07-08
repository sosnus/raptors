import { Component, OnInit } from "@angular/core";
import { MapService } from "../../../services/map.service";
import { BarrierService } from "../../../services/barrier.service";
import { Map } from "../../../model/Map";
import { ToastrService } from "ngx-toastr";
import { PolygonService } from "src/app/services/polygon.service";
import { AreaTypeService } from "src/app/services/type/area-type.service";

@Component({
  selector: "app-map-upload",
  templateUrl: "./barrier-generator.component.html",
  styleUrls: ["./barrier-generator.component.css"],
})
export class BarrierGeneratorComponent implements OnInit {
  mapSelected = false;
  yamlSelected = false;
  robotSize: string = "";
  success = false;
  error = false;

  constructor(
    private mapService: MapService,
    private polygonService: PolygonService,
    private barrierService: BarrierService,
    private toastrService: ToastrService,
    private areaTypeService: AreaTypeService
  ) {}

  ngOnInit() {}

  generateBarriers(): void {
    this.areaTypeService
      .getByID("5e45aebe08f28e6f84eedaa5")
      .subscribe((result) => {
        this.askBarriersGenerator(result);
      });
  }

  askBarriersGenerator(area): void {
    var polygons = [];
    this.barrierService.getBarriers(this.robotSize).subscribe(
      (data) => {
        data = JSON.parse(data);
        polygons = this.barrierService.parseToPolygons(data.polygons, area);
        this.savePolygons(polygons);
        this.toastrService.success("Mapa dodana pomyślnie");
        // Run here polygon servide adding data from barrier service
        this.success = true;
      },
      (error) => {
        this.toastrService.error("Bląd podczas dodawania mapy" + error.message);
        this.error = true;
      }
    );
  }

  savePolygons(polygons): void {
    polygons.forEach((element) => {
      this.polygonService.save(element).subscribe(
        (result) => {
          this.toastrService.success("Obszar zapisany w bazie");
        },
        (error) => {
          this.toastrService.error(
            "Bląd podczas dodawania poligonu" + error.message
          );
          this.error = true;
        }
      );
    });
  }

  checkForm() {
    return this.robotSize.length < 1;
  }
}
