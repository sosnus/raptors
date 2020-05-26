import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {StoreService} from "../../../../services/store.service";
import {GraphService} from "../../../../services/graph.service";
import {ToastrService} from "ngx-toastr";
import {Polygon} from "../../../../model/MapAreas/Polygons/Polygon";
import {PolygonService} from "../../../../services/polygon.service";

@Component({
  selector: 'app-polygon-list',
  templateUrl: './polygon-list.component.html',
  styleUrls: ['./polygon-list.component.css']
})
export class PolygonListComponent implements OnInit, OnChanges {

  polygons: Polygon[];
  modalID = "polygonListModal";

  @Input()
  polygon;

  @Output()
  polygonToEdit: EventEmitter<Polygon> = new EventEmitter<Polygon>();

  constructor(private store: StoreService,
              private graphService: GraphService,
              private polygonService: PolygonService,
              private toast: ToastrService) {
  }

  ngOnInit() {
    this.polygonService.getPolygons().subscribe(
      polygons => this.polygons = polygons,
      error => this.toast.error("Błąd podczas pobierania danych: " + error.message)
    );
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    this.polygonService.getPolygons().subscribe(polygons =>
        this.polygons = polygons,
      error => this.toast.error("/*Błąd podczas pobierania danych*/: " + error.message)
    )
  }

  editPolygon(polygon: Polygon) {
    this.polygonToEdit.emit(polygon);
  }

  delete(polygon: Polygon) {
    this.polygons = this.polygons.filter(next => next != polygon);

    this.polygonService.delete(polygon).subscribe(
      result => {
        this.polygons = this.polygons.filter(item => item !== polygon);
        this.toast.success('Usunięto graf ');
      },
      error => {
        /*
                this.toastr.error("Wystąpił błąd podczas usuwania");
        */
      }
    );
    //this.polygonToEdit.emit(null);

  }

}
