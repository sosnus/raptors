import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from '../../../services/map.service';
import {Marker} from 'leaflet/src/layer/marker/Marker.js';
import {Polygon} from 'leaflet/src/layer/vector/Polygon.js';
import '../../../../../node_modules/leaflet-contextmenu/dist/leaflet.contextmenu.js'
import '../../../../../node_modules/leaflet-path-transform/dist/L.Path.Transform.js'
import '../../../../lib/leaflet-circle-to-polygon/leaflet.circle.topolygon-src.js'
import '../../../../lib/leaflet-easybutton/src/easy-button';
import '../../../../lib/leaflet-easybutton/src/easy-button.css';
import {STANDICON} from "../map.component";
import {Stand} from "../../../model/Stand/Stand";
import {StandService} from "../../../services/stand.service";
import {
  axisAngleFromQuaternion,
  getCentroid,
  quaternionFromAxisAngle,
  StoreService
} from "../../../services/store.service";
import {ParkingType} from "../../../model/type/ParkingType";
import {StandType} from "../../../model/type/StandType";
import {StandStatus} from "../../../model/type/StandStatus";
import {ParkingTypeService} from "../../../services/type/parking-type.service";
import {StandTypeService} from "../../../services/type/stand-type.service";
import {StandStatusService} from "../../../services/type/stand-status.service";
import {ToastrService} from "ngx-toastr";

import 'leaflet-path-transform';
import {fromEvent} from "rxjs";

declare var L: any;

@Component({
  selector: 'app-standc-reator',
  templateUrl: './stand-creator.component.html',
  styleUrls: ['./stand-creator.component.css']
})
export class StandCreatorComponent implements OnInit, OnDestroy {

  public dataLoaded = false;

  private selectedMarker: Marker;
  public stand: Stand = new Stand();
  private standID;
  private orientationAxis: Polygon;
  private orientationAngle = 0;
  private tempAngle = 0;

  //Map related variables
  private map;
  private imageURL = '';
  private mapResolution = 0.01;//TODO()
  private imageResolution;
  private mapContainerSize = 800;
  private subscription;

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
    this.subscription = fromEvent(window, 'resize').subscribe(() => this.onResize());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onResize() {
    const mapContainer = document.getElementById('map-container');
    this.mapContainerSize = mapContainer.clientWidth;
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
    const imageBounds = [[0, 0], [this.mapContainerSize, this.mapContainerSize]];
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      contextmenu: true,
      minZoom: 0,
      maxZoom: 10
    });
    L.imageOverlay(this.imageURL, imageBounds).addTo(this.map);
    L.easyButton('fa-crosshairs', function (btn, map) {
      map.setView([400, 400], 0);
    }).addTo(this.map);
    this.map.fitBounds(imageBounds);

    this.map.on('click', e => {
      this.createNewMarker(e.latlng);
    });
  }

  onSubmit() {
    this.stand.pose.position.x = this.getRealCoordinates(this.selectedMarker.getLatLng().lng);
    this.stand.pose.position.y = this.getRealCoordinates(this.selectedMarker.getLatLng().lat);
    this.stand.pose.orientation = quaternionFromAxisAngle([0, 1, 0], this.degToRad(this.orientationAngle));
    this.standService.save(this.stand).subscribe(
      result => {
        this.toast.success("Dodano nowe stanowisko");

        this.clearMap();
      },
      error => this.toast.error("Błąd podczas dodawania stanowiska")
    )
  }

  private createNewMarker(position) {
    if (this.selectedMarker) {
      return;
    }
    let marker = new L.marker(position, {
      icon: STANDICON,
      contextmenu: true,
      contextmenuItems: [
        {
          text: 'Usuń stanowisko',
          callback: this.deleteMarker,
          context: this
        }
      ]
    });
    this.selectedMarker = marker;
    this.createOrientationCircle(marker);
    marker.addTo(this.map);
  }

  private createOrientationCircle(marker: Marker) {
    const circle = new L.Circle(marker.getLatLng(), 20).addTo(this.map);
    this.orientationAxis = L.polygon(
      circle.toPolygon(),
      {transform: true, draggable: true,})
      .addTo(this.map);
    this.orientationAxis.transform.enable({rotation: true, scaling: false});
    this.orientationAxis.on('drag', (e) => {
      this.selectedMarker.setLatLng(getCentroid(e.target.getLatLngs()[0]));
    });
    this.orientationAxis.on('rotate', (e) => {
      this.orientationAngle = this.tempAngle + this.radToDeg(e.rotation);
    });
    this.orientationAxis.on('rotateend', (e) => {
      this.tempAngle = this.orientationAngle;
    });
    this.map.removeLayer(circle);
    if (this.orientationAngle !== 0) {
      this.orientationAxis.transform.rotate(this.degToRad(this.orientationAngle));
    }
  }

  private deleteMarker() {
    if (this.selectedMarker) {
      this.map.removeLayer(this.orientationAxis.transform._handlersGroup)
      this.map.removeLayer(this.selectedMarker);
      this.map.removeLayer(this.orientationAxis);
    }
    this.selectedMarker = null;
    this.orientationAxis = null;
    this.orientationAngle = 0;
    this.tempAngle = 0
  }

  clearMap() {
    if (this.selectedMarker) {
      this.map.removeLayer(this.orientationAxis.transform._handlersGroup)
      this.map.removeLayer(this.selectedMarker);
      this.map.removeLayer(this.orientationAxis);
    }
    this.selectedMarker = null;
    this.orientationAxis = null;
    this.stand = new Stand();
    this.standID = null;
    this.orientationAngle = 0;
    this.tempAngle = 0
  }

  editExistingStand(stand: Stand) {
    this.clearMap();
    if (!stand) return;
    this.orientationAngle = this.radToDeg(axisAngleFromQuaternion(stand.pose.orientation));
    this.tempAngle = this.orientationAngle;
    this.standID = stand.id;
    const vertPos = L.latLng([this.getMapCoordinates(stand.pose.position.y), this.getMapCoordinates(stand.pose.position.x)]);
    this.createNewMarker(vertPos);
    this.stand = stand;
  }

  updateAngle() {
    if (this.orientationAxis) {
      this.orientationAxis.transform.rotate(this.degToRad(-this.tempAngle));
      this.tempAngle = this.orientationAngle;
      this.orientationAxis.transform.rotate(this.degToRad(this.orientationAngle));
    }
  }

  getRealCoordinates(value: number) {
    return (value * this.mapResolution * (this.imageResolution / this.mapContainerSize) - ((this.imageResolution * this.mapResolution) / 2))
  }

  getMapCoordinates(value) {
    return ((value) + (this.imageResolution * this.mapResolution) / 2) * (1 / this.mapResolution) * (this.mapContainerSize / this.imageResolution)
  }

  compareItems(id1: any, id2: any): boolean {
    return id1.id === id2.id;
  }

  radToDeg(radAngle) {
    return radAngle * 180 / Math.PI;
  }

  degToRad(degAngle) {
    return degAngle * Math.PI / 180;
  }
}
