import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from "../../../services/map.service";
import {MovementPathService} from "../../../services/movementPath.service";
import * as L from 'leaflet';
import {MovementPath} from "../../../model/MapAreas/MovementPaths/MovementPath";
import {UniversalPoint} from "../../../model/MapAreas/UniversalPoint";
import {StoreService} from "../../../services/store.service";
import {Marker} from "leaflet/src/layer/marker/Marker";
import {ToastrService} from "ngx-toastr";
import {WAYPOINTICON} from "../map.component";
import {Orientation} from "../../../model/Stand/Orientation";
import {fromEvent} from "rxjs";

@Component({
  selector: 'app-movement-path',
  templateUrl: './movement-path.component.html',
  styleUrls: ['./movement-path.component.css']
})
export class MovementPathComponent implements OnInit, OnDestroy {

  dataLoaded = false;
  private readonly context;
  private polyline: L.polyline = null;
  private vertices: Marker[] = [];
  private pathID;
  private name;

  //Map related variables
  private map;
  private imageURL = '';
  private mapResolution = 0.01;//TODO()
  private imageResolution;
  private mapContainerSize = 800;
  private subscription;

  constructor(private mapService: MapService,
              private movementPathService: MovementPathService,
              private store: StoreService,
              private toast: ToastrService) {
    this.context = this;
  }

  ngOnInit() {
    this.loadMap();
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
    }
  }

  private initMap(): void {
    const imageBounds = [[0, 0], [ this.mapContainerSize,  this.mapContainerSize]];
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      contextmenu: true,
    });
    L.imageOverlay(this.imageURL, imageBounds).addTo(this.map);
    L.easyButton('fa-crosshairs', function (btn, map) {
      map.setView([400, 400], 0);
    }).addTo(this.map);
    this.map.fitBounds(imageBounds);

    this.map.on('click', e => {
      this.createNewMarker(e.latlng);
      if (this.polyline == null) {
        this.polyline = new L.Polyline([]).addTo(this.map);
      }
      this.polyline.addLatLng(e.latlng);
    });
  }

  cancelMovementPath() {
    if (this.polyline != null) {
      this.map.removeLayer(this.polyline);
    }
    this.polyline = null;

    if (this.vertices.length != 0) {
      this.vertices.forEach(e => {
        this.map.removeLayer(e);
      })
    }
    this.vertices = [];
    this.name = "";
    this.pathID=null;
  }

  private getRealCoordinates(value) {
    return (value * this.mapResolution * (this.imageResolution /  this.mapContainerSize) - ((this.imageResolution * this.mapResolution) / 2))
  }

  saveMovementPath() {
    if (this.polyline == null) {
      alert("Nie wybrano żadnych punktów!");
      return;
    }
    if(this.polyline.getLatLngs().length<2){
      alert("Zdefiniowano za mało punktów!");
      return;
    }

    let universalPoints: UniversalPoint[] = [];
    this.polyline.getLatLngs().forEach(lang => {
      let universalPoint: UniversalPoint = new UniversalPoint(
        this.getRealCoordinates(lang.lat),
        this.getRealCoordinates(lang.lng),
        0);
      universalPoints.push(universalPoint)
    });

    let movementPath = new MovementPath(this.pathID, this.name, universalPoints);
    this.movementPathService.save(movementPath).subscribe(result => {
      if (result.id != null) {
        this.toast.success('Ścieżka zapisana w bazie');
        this.cancelMovementPath();
      } else {
        this.toast.error('Nie udało się zapisać do bazy');
      }
    });

  }

  private clearMap() {
    this.cancelMovementPath();
    this.pathID = null;
  }

  editExistingPath(path: MovementPath) {
    this.clearMap();
    if (!path) return;
    this.pathID = path.id;
    this.name = path.name;
    this.polyline = new L.Polyline([]);
    path.points.forEach(e => {
      const translatedPoint = L.latLng([this.getMapCoordinates(e.x), this.getMapCoordinates(e.y)]);
      this.polyline.addLatLng(translatedPoint);
      this.createNewMarker(translatedPoint);
    })
    this.polyline.addTo(this.map);

  }

  private getMapCoordinates(value) {
    return ((value) + (this.imageResolution * this.mapResolution) / 2) * (1 / this.mapResolution) * ( this.mapContainerSize / this.imageResolution)
  }

  private createNewMarker(position: L.latlng) {
    let marker = new L.marker(position, {
      draggable: true,
      icon: WAYPOINTICON
    });

    marker.on('move', e => {
      this.updatePoints(e)
    });

    marker.addTo(this.map);
    this.vertices.push(marker);
    return marker;
  }

  private updatePoints(e) {
    let markerPos = this.vertices.filter(marker => marker._leaflet_id === e.target._leaflet_id)[0];

    this.vertices.forEach(point => {
      if (point._leaflet_id === markerPos._leaflet_id) {
        point._latlng = markerPos._latlng;
      }
    });
    this.createPolyline();
  }

  private createPolyline() {
    this.map.removeLayer(this.polyline);
    this.polyline = new L.Polyline([]).addTo(this.map);
    this.vertices.forEach(marker => {
      this.polyline.addLatLng(marker._latlng);
    });
  }
}
