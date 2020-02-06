import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from "../../../services/map.service";
import {CorridorService} from "../../../services/corridor.service";
import {Marker} from "leaflet/src/layer/marker/Marker";
import * as L from 'leaflet';
import {UniversalPoint} from "../../../model/MapAreas/UniversalPoint";
import {Corridor} from "../../../model/MapAreas/Corridors/Corridor";
import {StoreService} from "../../../services/store.service";
import {MovementPath} from "../../../model/MapAreas/MovementPaths/MovementPath";
import {ToastrService} from "ngx-toastr";
import {MovementPathService} from "../../../services/movementPath.service";
import {WAYPOINTICON} from "../map.component";
import {fromEvent} from "rxjs";

@Component({
  selector: 'app-corridors',
  templateUrl: './corridors.component.html',
  styleUrls: ['./corridors.component.css']
})
export class CorridorsComponent implements OnInit, OnDestroy {

  dataLoaded = false;
  private drawCorridorBoolean = false;
  private polygonPoints = [];
  private vertices: Marker[] = [];
  private polygon = L.polygon;
  private corridor = new Corridor();
  private polygonsList = [[]];
  private paths: MovementPath[] = [];
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
              private corridorService: CorridorService,
              private store: StoreService,
              private toast: ToastrService,
              private movementPathService: MovementPathService) {
  }

  getPathsFromDb() {
    this.movementPathService.getMovementPaths().subscribe(
      data => this.paths = data
    )
  }

  ngOnInit() {
    this.loadMap();
    this.getPathsFromDb();
    this.subscription = fromEvent(window, 'resize').subscribe(() => this.onResize());
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onResize() {
    const mapContainer = document.getElementById('map-container');
    this.mapContainerSize = mapContainer.clientWidth;
  }


  drawCorridor() {
    this.map.on('click', e => {
      if (!this.drawCorridorBoolean) {
        const markerIcon = L.icon({
          iconUrl: '/assets/icons/position.png',
          iconSize: [36, 36],
          iconAnchor: [36 / 2, 36 / 2]
        });
        let marker = new L.marker(e.latlng, {
          draggable: true,
          icon: markerIcon,
          contextmenu: true,
          contextmenuItems: [
            {
              text: 'Usuń punkt trasy',
              callback: this.deleteMarker,
              context: this
            }
          ]
        });

        marker.addTo(this.map);
        this.vertices.push(marker);

        marker.on('move', e => {
          this.updateCorridor(e)
        });
      }
    });
  }

  cancelCorridor() {
    this.polygonPoints = [];
    this.map.removeLayer(this.polygon);
    this.polygon = L.polygon;
    this.vertices.forEach(e => {
      this.map.removeLayer(e);
    });
    this.vertices = [];
    this.corridor = new Corridor();
    this.name = null;
  }

  saveCorridor() {
    this.createCorridor();
    if (this.polygonPoints.length < 3) {
      alert("Nie zdefiniowano wierzchołków lub korytarz ma mniej niż trzy wierzchołki!");
      return;
    }

    let universalPoints: UniversalPoint[] = [];
    this.polygonPoints.forEach(corridorP => {
      let coords: L.latLng = new L.latLng([
        this.getRealCoordinates(corridorP.lat),
        this.getRealCoordinates(corridorP.lng)]);
      let universalPoint: UniversalPoint = new UniversalPoint(
        coords.lat,
        coords.lng,
        0
      );
      universalPoints.push(universalPoint)
    });
    this.corridor.name = this.name;
    if (this.pathID) {
      this.corridor.id = this.pathID;
    } else {
      this.corridor.id = null;
    }
    this.corridor.points = universalPoints;

    let path: MovementPath;
    path = this.paths.find(e => {
      if (e.id === this.corridor.movementPathId) {
        return e;
      }
    });
    if (path == null && this.corridor.movementPathId != null) {
      alert("Taka ścieżka już nie istnieje!")
      return;
    }

    if (path != null) {
      if (!this.checkPathInsidePolygon(path, this.polygon)) {
        alert("Ta ścieżka nie znajduje się w danym korytarzu!");
        return;
      }
    }

    if (!this.corridor.movementPathId) {
      this.corridor.movementPathId = null;
    }
    this.corridorService.save(this.corridor).subscribe(result => {
      if (result.id != null) {
        this.toast.success('Korytarz zapisany w bazie');
        this.cancelCorridor();
      } else {
        this.toast.error('Nie udało się zapisać do bazy');
      }
    });

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

  private deleteMarker(e) {
    if (this.polygonPoints.length != 0) {

      this.vertices = this.vertices.filter(marker => marker !== e.relatedTarget);
      this.map.removeLayer(e.relatedTarget);
      this.map.removeLayer(this.polygon);
      this.polygonPoints = [];
      this.createCorridor();

    } else {
      this.vertices = this.vertices.filter(marker => marker !== e.relatedTarget);
      this.map.removeLayer(e.relatedTarget);
    }
  }

  private getRealCoordinates(value) {
    return (value * this.mapResolution * (this.imageResolution /  this.mapContainerSize) - ((this.imageResolution * this.mapResolution) / 2));
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

    this.drawCorridor();
  }

  private updateCorridor(e) {
    let markerPos = this.vertices.filter(marker => marker._leaflet_id === e.target._leaflet_id)[0];
    let newEdges = [];
    newEdges = this.vertices;
    newEdges.forEach(vertice => {
      if (vertice._leaflet_id === markerPos._leaflet_id) {
        vertice._latlng = markerPos._latlng;
      }
    });
    this.polygonPoints = [];
    this.vertices = [];
    this.vertices = newEdges;
    this.createCorridor();
  }

  private createCorridor() {
    this.polygonPoints = [];
    this.vertices.forEach(marker => {
      this.polygonPoints.push(marker._latlng);
    });

    this.map.removeLayer(this.polygon);
    this.polygonsList.push(this.polygonPoints);
    this.polygon = L.polygon(this.polygonPoints, {color: 'red'}).addTo(this.map);
  }

  private clearMap() {
    this.cancelCorridor();
  }

  private getMapCoordinates(value) {
    return ((value) + (this.imageResolution * this.mapResolution) / 2) * (1 / this.mapResolution) * ( this.mapContainerSize / this.imageResolution)
  }

  editExistingCorridor(corridor: Corridor) {
    this.clearMap();
    if (!corridor) return;
    this.pathID = corridor.id;
    this.name = corridor.name;
    this.polygon = new L.polygon([], {color: 'red'});
    if (corridor.movementPathId) {
      this.corridor.movementPathId = corridor.movementPathId;
    }

    corridor.points.forEach(e => {
      const translatedPoint = L.latLng([this.getMapCoordinates(e.x), this.getMapCoordinates(e.y)]);
      this.polygon.addLatLng(translatedPoint);
      this.createNewMarker(translatedPoint);
    });
    this.polygon.addTo(this.map);

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
    this.createCorridor();
  }

  private checkPathInsidePolygon(path, polygon) {
    let points = path.points;
    let check = true;
    points.forEach(e => {
      const translatedPoint = L.latLng([this.getMapCoordinates(e.x), this.getMapCoordinates(e.y)]);
      let marker = new L.marker(translatedPoint);
      if (!polygon.getBounds().contains(marker.getLatLng())) {
        check = false;
      }
    });
    return check;
  }
}
