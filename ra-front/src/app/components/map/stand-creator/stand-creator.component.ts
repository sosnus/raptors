import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from '../../../services/map.service';
import { SettingsService } from '../../../services/settings.service';
import {Marker} from 'leaflet/src/layer/marker/Marker.js';
import {Polygon} from 'leaflet/src/layer/vector/Polygon.js';
import {Polygon as CustomPolygon} from '../../../model/MapAreas/Polygons/Polygon';
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
import {Kiosk} from "../../../model/Kiosk/Kiosk";
import {ParkingTypeService} from "../../../services/type/parking-type.service";
import {StandTypeService} from "../../../services/type/stand-type.service";
import {StandStatusService} from "../../../services/type/stand-status.service";
import {KioskService} from "../../../services/kiosk.service";
import {ToastrService} from "ngx-toastr";

import 'leaflet-path-transform';
import {fromEvent} from "rxjs";
import {MovementPathService} from "../../../services/movementPath.service";
import {MovementPath} from "../../../model/MapAreas/MovementPaths/MovementPath";
import {PolygonService} from "../../../services/polygon.service";
import {UniversalPointPair} from "../../../model/MapAreas/UniversalPointPair";

declare var L: any;

@Component({
  selector: 'app-standc-reator',
  templateUrl: './stand-creator.component.html',
  styleUrls: ['./stand-creator.component.css']
})
export class StandCreatorComponent implements OnInit, OnDestroy {

  public dataLoaded = false;
  private canBeEdited = true;
  forbidden="Obszar zabroniony";
  private polygonsLayer = L.featureGroup();
  private movementPathsLayer = L.featureGroup();
  private relatedPaths:MovementPath[];
  private overlays = {
    Obszary: this.polygonsLayer,
    Sciezki: this.movementPathsLayer
  };
  private allpolygons: Polygon[];

  private selectedMarker: Marker;
  public stand: Stand = new Stand();
  private standID;
  private orientationAxis: Polygon;
  private orientationAngle = 0;
  private tempAngle = 0;

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

  //data
  private parkingTypes: ParkingType[];
  private standTypes: StandType[];
  private standStatuses: StandStatus[];
  private kiosks: Kiosk[];
  private paths: MovementPath[];
  private polygons: CustomPolygon[];

  constructor(private mapService: MapService,
              private settingsService: SettingsService,
              private standService: StandService,
              private parkingTypeService: ParkingTypeService,
              private standTypeService: StandTypeService,
              private standStatusService: StandStatusService,
              private kiosksService: KioskService,
              private storeService: StoreService,
              private toast: ToastrService,
              private pathService: MovementPathService,
              private polygonService: PolygonService) {
  }

  ngOnInit() {
    this.loadMap();
    this.parkingTypeService.getAll().subscribe(data => this.parkingTypes = data);
    this.pathService.getMovementPaths().subscribe(data => this.paths = data);
    this.standTypeService.getAll().subscribe(data => this.standTypes = data);
    // this.standStatusService.getAll().subscribe(data => this.standStatuses = data);
    this.kiosksService.getAll().subscribe(
      data => {
        this.kiosks = data;
        this.kiosks.unshift(new Kiosk("Brak"));
      });
    this.subscription = fromEvent(window, 'resize').subscribe(() => this.onResize());
    this.polygonService.getPolygons().subscribe(data => this.polygons = data);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onResize() {
    const mapContainer = document.getElementById('map-container');
    this.mapContainerSize = mapContainer.clientWidth;
  }

  private loadMap() {
    this.settingsService.getCurrentMap().subscribe(
      mapData => {
        this.mapId = mapData.mapId;
        this.storeService.mapID = this.mapId;
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

    };
    this.pathService.getMovementPaths().subscribe(
      paths => {
        this.drawPaths(paths);
      }
    );

    this.polygonService.getPolygons().subscribe(
      polygons => {
        this.allpolygons = polygons;
        this.drawPolygons(this.allpolygons);
      }
    );
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
    L.control.layers({}, this.overlays).addTo(this.map);
  }

  private getPairOfPointsFromAreas() {
    let pairs:UniversalPointPair[]=[];

    let forbiddenAreas:CustomPolygon[]=this.polygons.filter(e=> e.type.name==this.forbidden);

    if(forbiddenAreas.length>0){
      forbiddenAreas.forEach(e=>{
        var i;
        let polygonPoints=e.points;
        for (i = 0; i < polygonPoints.length; i++) {

          if(i==(polygonPoints.length-1)){
            let pair2:UniversalPointPair=new UniversalPointPair(polygonPoints[0],polygonPoints[polygonPoints.length-1]);
            pairs.push(pair2);
            break;
          }

          let pair:UniversalPointPair=new UniversalPointPair(polygonPoints[i],polygonPoints[i+1]);
          pairs.push(pair);
        }
      });
    }

    return pairs;
  }

  private checkRelatedPaths() {
    let check = false;
    const id = this.stand.id;
    let pairs:UniversalPointPair[]=this.getPairOfPointsFromAreas();
    let relatedPathsWithFinishStand: MovementPath[] = this.paths.filter(e => e.finishStandId == id);
    let relatedPathsWithStartStand: MovementPath[] = this.paths.filter(e => e.startStandId == id);

    const a = this.getRealCoordinates(this.selectedMarker.getLatLng().lng, this.mapOriginX);
    const b = this.getRealCoordinates(this.selectedMarker.getLatLng().lat, this.mapOriginY);
    relatedPathsWithStartStand.forEach(e => {
      const c = e.points[1].x;
      const d = e.points[1].y;
      pairs.forEach(e=>{
        let inter=this.intersects(a, b, c, d, e.first.y, e.first.x, e.second.y, e.second.x);
        if(inter){
          check=true;
        }
      });
    });
    relatedPathsWithFinishStand.forEach(e => {
      const c = e.points[e.points.length - 2].x;
      const d = e.points[e.points.length - 2].y;

      pairs.forEach(e=>{
        let inter=this.intersects(a, b, c, d, e.first.y, e.first.x, e.second.y, e.second.x);
        if(inter){
          check=true;
        }
      });
    });
    return check;
  }

// returns true iff the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
  private intersects(a, b, c, d, p, q, r, s) {
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
      return false;
    } else {
      lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
      gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
      return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
  };

  onSubmit() {
     this.canBeEdited=this.checkRelatedPaths();
    if (this.canBeEdited) {
      this.toast.error("Niektóre ścieżki powiązane z tym stanowiskiem przechodzą teraz przez obszary zabronione!",'',{
        disableTimeOut: true,
      });
    }
      this.stand.pose.position.x = this.getRealCoordinates(this.selectedMarker.getLatLng().lng, this.mapOriginX);
      this.stand.pose.position.y = this.getRealCoordinates(this.selectedMarker.getLatLng().lat, this.mapOriginY);
      this.stand.pose.orientation = quaternionFromAxisAngle([0, 0, 1], this.degToRad(-this.orientationAngle + 90.0)); // korekta obrotu
      this.standService.save(this.stand).subscribe(
        result => {
          this.toast.success("Dodano nowe stanowisko");
          this.clearMap();
          this.pathService.getMovementPaths().subscribe(
            paths => {
              this.drawPaths(paths);
            }
          );

        },
        error => this.toast.error("Błąd podczas dodawania stanowiska")
      );


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
    this.orientationAngle = 90.0 - this.radToDeg(axisAngleFromQuaternion(stand.pose.orientation));
    while (this.orientationAngle > 360) this.orientationAngle -= 360;
    while (this.orientationAngle < 0) this.orientationAngle += 360;
    this.tempAngle = this.orientationAngle;
    this.standID = stand.id;
    const vertPos = L.latLng([this.getMapCoordinates(stand.pose.position.y, this.mapOriginY), this.getMapCoordinates(stand.pose.position.x, this.mapOriginX)]);
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

  getRealCoordinates(value: number, origin : number) {
    return (value * this.mapResolution * (this.imageResolution /  this.mapContainerSize) + origin)
  }

  getMapCoordinates(value, origin) {
    return (value - origin) * (1 / this.mapResolution) * ( this.mapContainerSize / this.imageResolution)
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

  private drawPolygon(polygon: Polygon) {

    let existingPolygonpoints = [];
    polygon.points.forEach(point => {
      const pointPosition = L.latLng([this.getMapCoordinates(point.x, this.mapOriginX), this.getMapCoordinates(point.y, this.mapOriginY)]);
      existingPolygonpoints.push(pointPosition);

    });
    let polygonik = L.polygon(existingPolygonpoints, {color: polygon.type.color}).bindTooltip(polygon.type.name, {
      sticky: true // If true, the tooltip will follow the mouse instead of being fixed at the feature center.
    });
    polygonik.addTo(this.polygonsLayer);
  }

  private drawPolygons(polygon: Polygon[]) {
    polygon.forEach(object => {
      this.drawPolygon(object);
    });
  }

  private drawPaths(paths: MovementPath[]) {
    this.movementPathsLayer.clearLayers();
    paths.forEach(path => {
        let polylinePoints = [];
        path.points.forEach(point => {
          const pointPosition = L.latLng([this.getMapCoordinates(point.y, this.mapOriginY), this.getMapCoordinates(point.x, this.mapOriginX)]);
          polylinePoints.push(pointPosition);
        });
        new L.Polyline(polylinePoints).addTo(this.movementPathsLayer).bindTooltip(path.name, {
          sticky: true
        });
      }
    )
  }
}
