import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from "../../../services/map.service";
import { SettingsService } from '../../../services/settings.service';
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
  private readonly context;
  private polyline: L.polyline = null;
  private vertices: Marker[] = [];
  private pathID;
  private name;

  private polygonsLayer = L.featureGroup();
  private corridorsLayer = L.featureGroup();

  private overlays = {
    Obszary: this.polygonsLayer,
    Korytarze: this.corridorsLayer,
  };
  //Map related variables
  private map;
  private imageURL = '';
  private mapId;
  private mapResolution;
  private mapOriginX;
  private mapOriginY;
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
  private separateMarkers: Marker[] = [];

  constructor(private mapService: MapService,
              private settingsService: SettingsService,
              private movementPathService: MovementPathService,
              private storeService: StoreService,
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
    this.settingsService.getCurrentMap().subscribe(
      mapData => {
        this.mapId = mapData.mapId;
        localStorage.setItem(this.storeService.mapID, this.mapId)
        this.mapResolution = mapData.mapResolutionX;
        this.mapOriginX = mapData.mapOriginX;
        this.mapOriginY = mapData.mapOriginY;
        this.mapService.getMap(this.mapId).subscribe(
          data => {
            this.afterMapLoaded(data);
          }
        );
      }
    );
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

    this.standService.getAllByMapId(this.mapId).subscribe(
      stands => {
        this.drawStands(stands);
        this.stands = stands;
      }
    );

    this.polygonService.getPolygons().subscribe(
      polygons => {
        this.allpolygons = polygons;
        this.drawPolygons(this.allpolygons);
      }
    );

    this.corridorService.getCorridors().subscribe(
      corridors => {
        this.drawCorridorsLayer(corridors);
      }
    );
  }

  private drawStands(stands: Stand[]) {

    stands.forEach(stand => {
      const position = [
        this.getMapCoordinates(Number(stand.pose.position.y), this.mapOriginY),
        this.getMapCoordinates(Number(stand.pose.position.x), this.mapOriginX)
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
    let eLat = e.relatedTarget._latlng.lat;
    let eLng = e.relatedTarget._latlng.lng;

    if (this.startStand != null) {
      if ((eLat == this.startStand.getLatLng().lat) && (eLng == this.startStand.getLatLng().lng)) {
        this.vertices = this.vertices.filter(marker => marker !== this.startStand);
        this.startStand = null;
        this.startStandId = null;
        this.createPolyline();
      }
    }
    if (this.finishStand != null) {
      if ((eLat == this.finishStand.getLatLng().lat) && (eLng == this.finishStand.getLatLng().lng)) {
        this.vertices = this.vertices.filter(marker => marker !== this.finishStand);
        this.finishStand = null;
        this.finishStandId = null;
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

  private resetStandMarkers() {
    this.standMarkers.forEach(e => {
      this.map.removeLayer(e);
      e.addTo(this.map);
    })
  }

  cancelMovementPath() {
    if (this.polyline != null) {
      this.map.removeLayer(this.polyline);
    }
    if (this.vertices.length != 0) {
      this.vertices.forEach(e => {

        this.map.removeLayer(e);
      });
    }
    ;
    if (this.separateMarkers.length != 0) {
      this.separateMarkers.forEach(e => {
        this.map.removeLayer(e);
      });
    }
    ;
    this.clearStartAndFinishTooltip();
    this.startStand = null;
    this.finishStand = null;

    this.vertices = [];
    this.name = "";
    this.pathID = null;
    this.polyline = new L.Polyline([]).addTo(this.map);
    this.resetStandMarkers();
  }

  getRealCoordinates(value: number, origin : number) {
    return (value * this.mapResolution * (this.imageResolution /  this.mapContainerSize) + origin)
  }

  private clearStartAndFinishTooltip() {
    if(this.startStand!=null) {
      var str = this.startStand._tooltip._content;
      this.startStand._tooltip._content = str.slice(8);
    }
    if(this.finishStand!=null){
      var str = this.finishStand._tooltip._content;
      this.finishStand._tooltip._content = str.slice(8);
    }
  }

  saveMovementPath() {
    if (this.startStand == null || this.finishStand == null) {
      alert("Punkt początkowy lub końcowy POI nie jest zdefiniowany!");
      return;
    }
    let universalPoints: UniversalPoint[] = [];
    this.polyline.getLatLngs().forEach(lang => {
      let universalPoint: UniversalPoint = new UniversalPoint(
        this.getRealCoordinates(lang.lng, this.mapOriginX),
        this.getRealCoordinates(lang.lat, this.mapOriginY),
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
      const translatedPoint = L.latLng([this.getMapCoordinates(e.y, this.mapOriginY), this.getMapCoordinates(e.x, this.mapOriginX)]);
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

    if (this.startStand != null) {
      this.standMarkers.forEach(e => {
        if (e._latlng.lat == this.startStand.getLatLng().lat && e._latlng.lng == this.startStand.getLatLng().lng) {
          e._tooltip._content = " START: " + e._tooltip._content;
        }
      });
      this.vertices.splice(0, 0, this.startStand);
    } else {
      this.toast.error("Stanowisko startowe powiązane wcześniej z tą ścieżką zostało usunięte! Należy ustawić nowy punkt POI startowy!", '', {
        disableTimeOut: true,
      });
    }

    if (this.finishStand != null) {
      this.standMarkers.forEach(e => {
        if (e._latlng.lat == this.finishStand.getLatLng().lat && e._latlng.lng == this.finishStand.getLatLng().lng) {
          e._tooltip._content = "KONIEC: " + e._tooltip._content;
        }
      });
      this.vertices.push(this.finishStand);
    } else {
      this.toast.error("Stanowisko końcowe powiązane wcześniej z tą ścieżką zostało usunięte! Należy ustawić nowy punkt POI końcowy!", '', {
        disableTimeOut: true,
      });
    }

    this.startStandId = path.startStandId;
    this.finishStandId = path.finishStandId;
    this.polyline.addTo(this.map);
    this.createPolyline();
  }

  private getMapCoordinates(value, origin) {
    return (value - origin) * (1 / this.mapResolution) * ( this.mapContainerSize / this.imageResolution)
  }

  private createNewMarker(position: L.latlng) {

    if (this.finishStand != null) {
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
      this.separateMarkers.push(marker);
    }
    ;
    if (this.finishStand == null) {
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

    if (this.finishStand == null) {
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

    if(markerPos!=null){
      this.vertices.forEach(point => {
        if (point._leaflet_id === markerPos._leaflet_id) {
          point._latlng = markerPos._latlng;
        }
      });
    }
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
        this.getMapCoordinates(Number(stand.pose.position.y), this.mapOriginY),
        this.getMapCoordinates(Number(stand.pose.position.x), this.mapOriginX)
      ];
      if (position[0] == marker._latlng.lat && position[1] == marker._latlng.lng) {
        id = stand.id;
      }
    });
    return id;
  }

  private getMarkerByStand(stand: Stand) {
    if (stand == null) {
      return null;
    } else {
      var currentMarker;
      this.standMarkers.forEach(e => {
        const position = [
          this.getMapCoordinates(Number(stand.pose.position.y), this.mapOriginY),
          this.getMapCoordinates(Number(stand.pose.position.x), this.mapOriginX)
        ];
        if (position[0] == e._latlng.lat && position[1] == e._latlng.lng) {
          currentMarker = e;
        }
      });
      return currentMarker;
    }
  }

  private drawCorridorsLayer(corridor: Corridor[]) {
    corridor.forEach(corridor => {
      let corridorPoints = [];
      corridor.points.forEach(point => {
        const pointPosition = L.latLng([this.getMapCoordinates(point.y, this.mapOriginY), this.getMapCoordinates(point.x, this.mapOriginX)]);
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
      const pointPosition = L.latLng([this.getMapCoordinates(point.x, this.mapOriginX), this.getMapCoordinates(point.y, this.mapOriginY)]);
      existingPolygonpoints.push(pointPosition);

    });
    let polygonik = L.polygon(existingPolygonpoints, {color: polygon.type.color}).bindTooltip(polygon.type.name, {
      sticky: true
    });
    polygonik.addTo(this.polygonsLayer);
  }
}
