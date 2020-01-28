import {Component, OnInit} from '@angular/core';
import {MapService} from '../../../services/map.service';
import * as L from 'leaflet';
import {Marker} from 'leaflet/src/layer/marker/Marker.js';
import '../../../../../node_modules/leaflet-contextmenu/dist/leaflet.contextmenu.js'
import '../../../../lib/leaflet-easybutton/src/easy-button';
import '../../../../lib/leaflet-easybutton/src/easy-button.css';
import {STANDICON} from "../map.component";
import {Orientation} from "../../../model/Stand/Orientation";
import {Stand} from "../../../model/Stand/Stand";
import {StandService} from "../../../services/stand.service";
import {StoreService} from "../../../services/store.service";
import {ParkingType} from "../../../model/type/ParkingType";
import {StandType} from "../../../model/type/StandType";
import {StandStatus} from "../../../model/type/StandStatus";
import {ParkingTypeService} from "../../../services/type/parking-type.service";
import {StandTypeService} from "../../../services/type/stand-type.service";
import {StandStatusService} from "../../../services/type/stand-status.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-standc-reator',
  templateUrl: './stand-creator.component.html',
  styleUrls: ['./stand-creator.component.css']
})
export class StandCreatorComponent implements OnInit {

  public dataLoaded = false;
  private imageResolution;
  private map;
  private mapResolution = 0.01;//TODO()
  private imageURL = '';

  private selectedMarker: Marker;
  public stand: Stand = new Stand();
  private standID;

  //data
  private parkingTypes: ParkingType[];
  private standTypes: StandType[];
  private standStatuses: StandStatus[];

  constructor(private mapService: MapService,
              private standService: StandService,
              private parkingTypeService: ParkingTypeService,
              private standTypeService: StandTypeService,
              private standStatusService: StandStatusService,
              private store: StoreService,
              private toast: ToastrService) {
  }

  ngOnInit() {
    this.loadMap();
    this.parkingTypeService.getAll().subscribe(data => this.parkingTypes = data);
    this.standTypeService.getAll().subscribe(data => this.standTypes = data);
    this.standStatusService.getAll().subscribe(data => this.standStatuses = data);
  }

  private loadMap() {
    if (localStorage.getItem(this.store.mapID) !== null) {
      this.afterMapLoaded(localStorage.getItem(this.store.mapID))
    } else {
      this.mapService.getMap(this.store.mapID).subscribe(
        data => {
          this.afterMapLoaded(data);
          localStorage.setItem(this.store.mapID, data)
        }
      );
    }
  }

  private afterMapLoaded(data: String) {
    this.dataLoaded = true;
    this.imageURL = 'data:image/jpg;base64,' + data;
    this.initMap();

    const img = new Image;
    img.src = this.imageURL;
    img.onload = () => {
      this.imageResolution = img.width;
      //
    }
  }

  private initMap(): void {
    const imageBounds = [[0, 0], [800, 800]];
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      contextmenu: true,
    });
    L.imageOverlay(this.imageURL, imageBounds).addTo(this.map);
    L.easyButton('fa-crosshairs', function (btn, map) {
      map.setView([400, 400], 0);
    }).addTo(this.map);
    this.map.fitBounds(imageBounds);

    this.map.once('click', e => {
      this.createNewMarker(e.latlng);
    });
  }

  private createNewMarker(position) {
    let marker = new L.marker(position, {
      draggable: true,
      icon: STANDICON,
      contextmenu: true,
      contextmenuItems: [
        {
          text: 'Usuń stanowisko',
          // callback: this.deleteMarker,
          context: this
        }
      ]
    });
    this.selectedMarker = marker;
    marker.addTo(this.map);
  }

  onSubmit() {
    this.stand.pose.position.x = this.getRealCoordinates(this.selectedMarker.getLatLng().lng);
    this.stand.pose.position.y = this.getRealCoordinates(this.selectedMarker.getLatLng().lat);
    this.stand.pose.orientation = new Orientation(0, 0, 0, 0);
    this.standService.save(this.stand).subscribe(
      result => {
        this.toast.success("Dodano nowe stanowisko");

        this.clearMap();
      },
      error => this.toast.error("Błąd podczas dodawania stanowiska")
    )
  }

  getRealCoordinates(value: number) {
    return (value * this.mapResolution * (this.imageResolution / 800) - ((this.imageResolution * this.mapResolution) / 2))
  }

  getMapCoordinates(value) {
    return ((value) + (this.imageResolution * this.mapResolution) / 2) * (1 / this.mapResolution) * (800 / this.imageResolution)
  }

  clearMap() {
    if (this.selectedMarker) {
      this.map.removeLayer(this.selectedMarker);
    }
    this.stand = new Stand();
    this.standID = null;
  }

  editExistingStand(stand: Stand) {
    this.clearMap();
    if (!stand) return;
    this.standID = stand.id;
    const vertPos = L.latLng([this.getMapCoordinates(stand.pose.position.y), this.getMapCoordinates(stand.pose.position.x)]);
    this.createNewMarker(vertPos);
    this.stand = stand;
  }

  compareItems(id1: any, id2: any): boolean {
    return id1.id === id2.id;
  }
}
