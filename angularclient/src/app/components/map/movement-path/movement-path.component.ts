import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from "../../../services/map.service";
import {MovementPathService} from "../../../services/movementPath.service";
import * as L from 'leaflet';
import {MovementPath} from "../../../model/MapAreas/MovementPaths/MovementPath";
import {UniversalPoint} from "../../../model/MapAreas/UniversalPoint";
import {axisAngleFromQuaternion, StoreService} from "../../../services/store.service";
import {Marker} from "leaflet/src/layer/marker/Marker.js";
import {ToastrService} from "ngx-toastr";
import {ARROWICON, CIRCLEBACK, STANDICON, WAYPOINTICON} from "../map.component";
import {fromEvent} from "rxjs";
import {StandService} from "../../../services/stand.service";
import {Stand} from "../../../model/Stand/Stand";
import {Corridor} from "../../../model/MapAreas/Corridors/Corridor";
import {CorridorService} from "../../../services/corridor.service";
import {Polygon} from "../../../model/MapAreas/Polygons/Polygon";
import {PolygonService} from "../../../services/polygon.service";

@Component({
  selector: 'app-movement-path',
  templateUrl: './movement-path.component.html',
  styleUrls: ['./movement-path.component.css']
})
export class MovementPathComponent implements OnInit, OnDestroy {

  dataLoaded = false;
  showPaths = false;
  private readonly context;
  private polyline: L.polyline = null;
  private vertices: Marker[] = [];
  private paths: MovementPath[];
  private pathID;
  private name;

  private standLayer = L.featureGroup();
  private polygonsLayer = L.featureGroup();
  private corridorsLayer = L.featureGroup();

  private overlays = {
    Obszary: this.polygonsLayer,
    Korytarze: this.corridorsLayer,
  };
  //Map related variables
  private map;
  private imageURL = '';
  private mapResolution = 0.01;//TODO()
  private imageResolution;
  private mapContainerSize = 800;
  private subscription;

  private startStand: Marker;
  private finishStand: Marker;

  private startStandId: string;
  private finishStandId: string;

  private stands: Stand[];
  private standMarkers: Marker = [];
  private allpolygons: Polygon[];

  constructor(private mapService: MapService,
              private movementPathService: MovementPathService,
              private store: StoreService,
              private toast: ToastrService,
              private standService: StandService,
              private corridorService: CorridorService,
              private polygonService: PolygonService) {
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
    // const mapContainer = document.getElementById('map-container');
    // this.mapContainerSize = mapContainer.clientWidth;
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

    this.standService.getAll().subscribe(
      stands => {
        this.drawStand(stands);
        this.stands = stands;
      }
    );

    this.polygonService.getPolygons().subscribe(
      polygons => {
        this.allpolygons = polygons;
        this.drawPolygons(this.allpolygons);
      }
    );

    this.movementPathService.getMovementPaths().subscribe(
      paths => {
        this.paths = paths;
      }
    );

    this.corridorService.getCorridors().subscribe(
      corridors => {
        this.drawCorridorsLayer(corridors);
      }
    );
  }

  private drawStand(stands: Stand[]) {

    stands.forEach(stand => {
      const position = [
        this.getMapCoordinates(Number(stand.pose.position.y)),
        this.getMapCoordinates(Number(stand.pose.position.x))
      ];
      let circleMarker = L.marker(position, {
        icon: CIRCLEBACK
      });
      circleMarker.addTo(this.map);
      let orientationMarker = L.marker(position, {
        icon: ARROWICON,
        rotationAngle: axisAngleFromQuaternion(stand.pose.orientation) * 180 / Math.PI
      });
      orientationMarker.addTo(this.map);
      let marker = L.marker(position, {
        icon: STANDICON,
        contextmenu: true,
        contextmenuItems: [
          {
            text: 'Oznacz jako POI startowy',
            callback: this.markAsStart,
            context: this
          },
          {
            text: 'Oznacz jako POI końcowy',
            callback: this.markAsFinish,
            context: this
          },
          {
            text: 'Usuń POI ze ścieżki',
            callback: this.deletePOI,
            context: this
          }
        ]
      }).bindTooltip(stand.name, {
        sticky: true
      });
      this.standMarkers.push(marker);
      marker.addTo(this.map);
    })
  }

  private deletePOI(e) {
    if (this.startStand != null) {
      if (e.relatedTarget.getLatLng() == this.startStand.getLatLng()) {
        this.vertices = this.vertices.filter(marker => marker !== this.startStand);
        this.startStand = null;
        this.createPolyline();
      }
    }
    if (this.finishStand != null) {
      if (e.relatedTarget.getLatLng() == this.finishStand.getLatLng()) {
        this.vertices = this.vertices.filter(marker => marker !== this.finishStand);
        this.finishStand = null;
        this.createPolyline();
      }
    }
    var str = e.relatedTarget._tooltip._content;
    e.relatedTarget._tooltip._content = str.slice(8);
  }

  private markAsStart(e) {
    if (this.startStand != null) {
      alert("Punkt początkowy POI jest już zdefiniowany!");
    } else {
      e.relatedTarget._tooltip._content = " START: " + e.relatedTarget._tooltip._content;
      this.startStand = e.relatedTarget;
      this.vertices.splice(0, 0, this.startStand);
      this.createPolyline();
    }
  }

  private markAsFinish(e) {
    if (this.finishStand != null) {
      alert("Punkt końcowy POI jest już zdefiniowany!");
    }
    if (this.startStand == null) {
      alert("Zdefiniuj najpierw punkt początkowy POI!");
    } else {
      e.relatedTarget._tooltip._content = "KONIEC: " + e.relatedTarget._tooltip._content;
      this.finishStand = e.relatedTarget;
      this.vertices.push(this.finishStand);
      this.createPolyline();
    }
  }

  private initMap(): void {
    const imageBounds = [[0, 0], [this.mapContainerSize, this.mapContainerSize]];
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      contextmenu: true,
    });
    L.imageOverlay(this.imageURL, imageBounds).addTo(this.map);
    L.easyButton('fa-crosshairs', function (btn, map) {
      map.setView([400, 400], 0);
    }).addTo(this.map);
    this.map.fitBounds(imageBounds);
    this.polyline = new L.Polyline([]).addTo(this.map);

    this.map.on('click', e => {
      const marker = this.createNewMarker(e.latlng);
      if (marker != null) {
        this.polyline.addLatLng(e.latlng);
      }
    });
    L.control.layers({}, this.overlays).addTo(this.map);
  }

  cancelMovementPath() {
    if (this.polyline != null) {
      this.map.removeLayer(this.polyline);
    }
    if (this.vertices.length != 0) {
      this.vertices.forEach(e => {
        if (this.vertices.indexOf(e) !== 0 && this.vertices.indexOf(e) !== (this.vertices.length - 1)) {
          this.map.removeLayer(e);
        }
      });
    }
    this.vertices = [];
    this.name = "";
    this.pathID = null;
    this.startStand = null;
    this.finishStand = null;
    this.polyline = new L.Polyline([]).addTo(this.map);
  }

  private getRealCoordinates(value) {
    return (value * this.mapResolution * (this.imageResolution / this.mapContainerSize) - ((this.imageResolution * this.mapResolution) / 2))
  }

  saveMovementPath() {
    if (this.startStand == null || this.finishStand == null) {
      alert("Punkt początkowy lub końcowy POI nie jest zdefiniowany!");
      return;
    }

    let universalPoints: UniversalPoint[] = [];
    this.polyline.getLatLngs().forEach(lang => {
      let universalPoint: UniversalPoint = new UniversalPoint(
        this.getRealCoordinates(lang.lng),
        this.getRealCoordinates(lang.lat),
        0);
      universalPoints.push(universalPoint)
    });
    this.startStandId = this.getStandId(this.startStand, this.stands);
    this.finishStandId = this.getStandId(this.finishStand, this.stands);

    let movementPath = new MovementPath(this.pathID, this.name, universalPoints, this.startStandId, this.finishStandId);
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
      const translatedPoint = L.latLng([this.getMapCoordinates(e.y), this.getMapCoordinates(e.x)]);
      this.polyline.addLatLng(translatedPoint);
      if (path.points[0] != e && path.points[path.points.length - 1] != e) {
        this.createNewMarker(translatedPoint);
      }
    });
    let currentStartStand: Stand = this.stands.find(e => {
      if (e.id == path.startStandId) {
        return e;
      }
    });
    let currentFinishStand: Stand = this.stands.find(e => {
      if (e.id == path.finishStandId) {
        return e;
      }
    });

    this.startStand = this.getMarkerByStand(currentStartStand);
    this.finishStand = this.getMarkerByStand(currentFinishStand);

    this.startStandId = path.startStandId;
    this.finishStandId = path.finishStandId;
    this.vertices.splice(0, 0, this.startStand);
    this.vertices.push(this.finishStand);
    this.polyline.addTo(this.map);


    this.createPolyline();

  }

  private getMapCoordinates(value) {
    return ((value) + (this.imageResolution * this.mapResolution) / 2) * (1 / this.mapResolution) * (this.mapContainerSize / this.imageResolution)
  }

  private createNewMarker(position: L.latlng) {

    if (this.finishStand != null && this.startStand != null) {
      var marker = new L.marker(position, {
        draggable: true,
        icon: WAYPOINTICON,
        contextmenu: true,
        contextmenuItems: [
          {
            text: 'Usuń punkt',
            callback: this.deleteMarker,
            context: this
          },
          {
            text: 'Dodaj punkt do ścieżki',
            callback: this.addToPoly,
            context: this
          }
        ]
      });
    }
    ;
    if (this.finishStand == null || this.startStand == null) {
      var marker = new L.marker(position, {
        draggable: true,
        icon: WAYPOINTICON,
        contextmenu: true,
        contextmenuItems: [
          {
            text: 'Usuń punkt',
            callback: this.deleteMarker,
            context: this
          }
        ]
      });
    }
    ;

    marker.on('move', e => {
      this.updatePoints(e)
    });
    marker.addTo(this.map);

    if (this.finishStand == null || this.startStand == null) {
      this.vertices.push(marker);
      return marker;
    }
  }

  private deleteMarker(e) {
    this.vertices = this.vertices.filter(marker => marker !== e.relatedTarget);
    this.map.removeLayer(e.relatedTarget);
    this.createPolyline();
  }

  private addToPoly(e) {

    if (this.vertices.includes(e.relatedTarget)) {
      return;
    }

    let points: L.LatLng [];
    points = this.polyline.getLatLngs();

    let closestA;
    let closestB;
    let distanceA = Math.sqrt(

      Math.pow(e.relatedTarget._latlng.lat - points[0].lat, 2)
      +
      Math.pow(e.relatedTarget._latlng.lng - points[0].lng, 2));
    closestA = points[0];

    points.forEach(point => {
      let distance = Math.sqrt(
        Math.pow(e.relatedTarget._latlng.lat - point.lat, 2)
        +
        Math.pow(e.relatedTarget._latlng.lng - point.lng, 2));

      if (distance < distanceA) {
        distanceA = distance;
        closestA = point;
      }
    });
    const indxA = points.indexOf(closestA);

    if (indxA == 0) {
      var distanceB = Math.sqrt(
        Math.pow(e.relatedTarget._latlng.lat - points[1].lat, 2)
        +
        Math.pow(e.relatedTarget._latlng.lng - points[1].lng, 2));
      closestB = points[1];
    } else {
      var distanceB = Math.sqrt(
        Math.pow(e.relatedTarget._latlng.lat - points[0].lat, 2)
        +
        Math.pow(e.relatedTarget._latlng.lng - points[0].lng, 2));
      closestB = points[0];
    }

    points.forEach(point => {
      if (points.indexOf(point) != indxA) {
        let distance = Math.sqrt(
          Math.pow(e.relatedTarget._latlng.lat - point.lat, 2)
          +
          Math.pow(e.relatedTarget._latlng.lng - point.lng, 2));

        if (distance < distanceB) {
          distanceB = distance;
          closestB = point;
        }
      }
    });
    const indxB = points.indexOf(closestB);

        if (indxA > indxB) {
      points.splice(indxA, 0, e.relatedTarget._latlng);
      this.vertices.splice(indxA, 0, e.relatedTarget);
    } else {
      points.splice(indxB, 0, e.relatedTarget._latlng);

      this.vertices.splice(indxB, 0, e.relatedTarget);
    }
    this.polyline.setLatLngs(points);
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

  private getStandId(marker: L.marker, stands: Stand[]) {
    let id: string;
    stands.forEach(stand => {
      const position = [
        this.getMapCoordinates(Number(stand.pose.position.y)),
        this.getMapCoordinates(Number(stand.pose.position.x))
      ];
      if (position[0] == marker._latlng.lat && position[1] == marker._latlng.lng) {
        id = stand.id;
      }
    });
    return id;
  }

  private getMarkerByStand(stand: Stand) {
    let currentMarker;
    this.standMarkers.forEach(e => {
      const position = [
        this.getMapCoordinates(Number(stand.pose.position.y)),
        this.getMapCoordinates(Number(stand.pose.position.x))
      ];
      if (position[0] == e._latlng.lat && position[1] == e._latlng.lng) {
        currentMarker = L.marker(position, {});
      }
    });

    return currentMarker;
  }

  private drawCorridorsLayer(corridor: Corridor[]) {
    corridor.forEach(corridor => {
      let corridorPoints = [];
      corridor.points.forEach(point => {
        const pointPosition = L.latLng([this.getMapCoordinates(point.y), this.getMapCoordinates(point.x)]);
        corridorPoints.push(pointPosition);
      });
      let corridorPolygon = L.polygon(corridorPoints, {color: 'red'}).addTo(this.corridorsLayer).bindTooltip(corridor.name, {
        sticky: true
      });
    })
  }
  private drawPolygons(polygon: Polygon[]) {
    polygon.forEach(object => {
      this.drawPolygon(object);
    });
  }

  private drawPolygon(polygon: Polygon) {

    let existingPolygonpoints = [];
    polygon.points.forEach(point => {
      const pointPosition = L.latLng([this.getMapCoordinates(point.x), this.getMapCoordinates(point.y)]);
      existingPolygonpoints.push(pointPosition);

    });
    let polygonik = L.polygon(existingPolygonpoints, {color: polygon.type.color}).bindTooltip(polygon.type.name, {
      sticky: true // If true, the tooltip will follow the mouse instead of being fixed at the feature center.
    });
    polygonik.addTo(this.polygonsLayer);
  }
}
