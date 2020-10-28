import {Component, OnDestroy, OnInit} from '@angular/core';
import * as L from 'leaflet';
import '../../../../node_modules/leaflet-rotatedmarker/leaflet.rotatedMarker.js'
import '../../../lib/leaflet-easybutton/src/easy-button';
import '../../../lib/leaflet-easybutton/src/easy-button.css';
import { MapService } from '../../services/map.service';
import { RobotService } from '../../services/robot.service';
import { SettingsService } from '../../services/settings.service';
import { axisAngleFromQuaternion, StoreService } from '../../services/store.service';
import { GraphService } from '../../services/graph.service';
import { Graph } from '../../model/Graphs/Graph';
import { PolygonService } from '../../services/polygon.service';
import { Polygon } from '../../model/MapAreas/Polygons/Polygon';
import { StandService } from '../../services/stand.service';
import { Stand } from '../../model/Stand/Stand';
import { CorridorService } from '../../services/corridor.service';
import { MovementPathService } from '../../services/movementPath.service';
import { Corridor } from '../../model/MapAreas/Corridors/Corridor';
import { MovementPath } from '../../model/MapAreas/MovementPaths/MovementPath';
import { fromEvent, Subscription, timer } from 'rxjs';
import {Robot} from "../../model/Robots/Robot";
import {RobotStatus} from "../../model/Robots/RobotStatus";
import {CurrentMap} from "../../model/Settings/CurrentMap";

export const WAYPOINTICON = L.icon({
  iconUrl: '/assets/icons/position.png',
  iconSize: [36, 36],
  iconAnchor: [36 / 2, 36 / 2]
});
export const WAYPOINTICON_WAITING = L.icon({
  iconUrl: '/assets/icons/position_waiting.png',
  iconSize: [36, 36],
  iconAnchor: [36 / 2, 36 / 2]
});
export const WAYPOINTICON_WAITING_DEPARTURE = L.icon({
  iconUrl: '/assets/icons/position_waiting_departure.png',
  iconSize: [36, 36],
  iconAnchor: [36 / 2, 36 / 2]
});
export const WAYPOINTICON_DEPARTURE = L.icon({
  iconUrl: '/assets/icons/position_departure.png',
  iconSize: [36, 36],
  iconAnchor: [36 / 2, 36 / 2]
});
export const WAYPOINTICON_INTERSECTION = L.icon({
  iconUrl: '/assets/icons/position_intersection.png',
  iconSize: [36, 36],
  iconAnchor: [36 / 2, 36 / 2]
});
export const STANDICON = L.icon({
  iconUrl: '/assets/icons/stand.png',
  iconSize: [50, 50],
  iconAnchor: [50 / 2, 50 / 2]
});
export const ROBOTICON = L.icon({
  iconUrl: '/assets/icons/robot.png',
  iconSize: [40, 40],
  iconAnchor: [40 / 2, 40 / 2]
});
export const ARROWICON = L.icon({
  iconUrl: '/assets/icons/arrow.png',
  iconSize: [100, 100],
  iconAnchor: [100 / 2, 100 / 2]
});
export const CIRCLEBACK = L.icon({
  iconUrl: '/assets/icons/circlebackground.png',
  iconSize: [110, 110],
  iconAnchor: [110 / 2, 110 / 2]
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  dataLoaded = false;
  robotDataloaded = false;
  subscription: Subscription;

  private robotStatusLayer = L.featureGroup();
  private standLayer = L.featureGroup();
  private graphs = L.featureGroup();
  private polygons = L.featureGroup();
  private movementPaths = L.featureGroup();
  private corridors = L.featureGroup();

  //filters for the map
  private overlays = {
    Online: this.robotStatusLayer,
    Grafy: this.graphs,
    Obszary: this.polygons,
    Korytarze: this.corridors,
    Stanowiska: this.standLayer,
    Sciezki: this.movementPaths
  };

  //Leaflet accepts coordinates in [y,x]
  private robotMarkers = {};
  private allpolygons: Polygon[];
  private robotStatus : string[] = [];
  private source = timer(1000, 1000);
  private subscribe;

  //Map related variables
  private map;
  private imageURL = '';
  private mapId;
  private mapResolution;
  private mapOriginX;
  private mapOriginY;
  private imageResolution;
  private mapContainerSize = 800;

  

  //private robotIP = '';

  constructor(private mapService: MapService,
              private robotService: RobotService,
              private settingsService: SettingsService,
              private storeService: StoreService,
              private graphService: GraphService,
              private polygonService: PolygonService,
              private standService: StandService,
              private store: StoreService,
              private corridorService: CorridorService,
              private pathsService: MovementPathService) {
  }

  ngOnInit() {
    // if (localStorage.getItem(this.store.mapID) !== null) {
    //   this.afterMapLoaded(localStorage.getItem(this.store.mapID));
    //   this.subscribe = this.source.subscribe(val => 
    //     {
    //       this.robotService.getAll().subscribe(
    //       robots=>{
    //         this.updateRobots(robots);
    //       });
    //     });
    // } else {
    this.settingsService.getCurrentMap().subscribe(
      mapData => {
        this.mapId = mapData.currentMapId;
        this.mapResolution = mapData.mapResolutionX;
        this.mapOriginX = mapData.mapOriginX;
        this.mapOriginY = mapData.mapOriginY;
        this.mapService.getMap(this.mapId).subscribe(
          data => {
            this.afterMapLoaded(data);
            this.subscribe = this.source.subscribe(val => {
              this.robotService.getAll().subscribe(
              robots=>{
                this.updateRobots(robots);
              });
            });
          }
        );
      }
    );
    // console.log(this.storeService.url);
    // }
    //setTimeout(() => this.updateRobotMarkerPositions([[100, 992]], 0.01), 3000);
    //this.subscription = fromEvent(window, 'resize').subscribe(() => this.onResize());
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
    //this.subscription.unsubscribe();
  }

  onResize() {
    const mapContainer = document.getElementById('map-container');
    this.mapContainerSize = mapContainer.clientWidth;
  }

  private initMap(): void {

    const imageBounds = [[0, 0], [ this.mapContainerSize,  this.mapContainerSize]];
    this.map = L.map('map', {
      crs: L.CRS.Simple
    });

    L.imageOverlay(this.imageURL, imageBounds).addTo(this.map);
    L.easyButton('fa-crosshairs', function (btn, map) {
      map.setView([400, 400], 0);
    }).addTo(this.map);
    this.map.fitBounds(imageBounds);
    L.control.layers({}, this.overlays).addTo(this.map);
  }

  private afterMapLoaded(data: String) {
    this.dataLoaded = true;
    this.imageURL = this.parseToJpeg(data);
    this.initMap();



    this.graphService.getAll().subscribe(
      graphs => {
        graphs.map(graph => this.drawGraph(graph))

      }
    );

    this.polygonService.getPolygons().subscribe(
      polygons => {
        this.allpolygons = polygons;
        this.drawPolygons(this.allpolygons);
      }
    );

    this.standService.getAll().subscribe(
      stands => {
        this.drawStand(stands);
      }
    );

    const img = new Image;
    img.src = this.imageURL;
    img.onload = () => {
      this.imageResolution = img.width;
      // this.robotService.getAll().subscribe(
      //   robots=>{
      //     this.drawRobots(robots);

      //   }
      // );
      //this.drawRobots(this.robots);
    };
    this.corridorService.getCorridors().subscribe(
      corridors => {
        this.drawCorridors(corridors);
      }
    );

    this.pathsService.getMovementPaths().subscribe(
      paths => {
        this.drawPaths(paths);
      }
    );
  }

  private drawCorridors(corridor: Corridor[]) {
    corridor.forEach(corridor => {
      let corridorPoints = [];
      corridor.points.forEach(point => {
        const pointPosition = L.latLng([this.getMapCoordinates(point.y, this.mapOriginY), this.getMapCoordinates(point.x, this.mapOriginX)]);
        corridorPoints.push(pointPosition);
      });
      let corridorPolygon = L.polygon(corridorPoints, {color: 'red'}).addTo(this.corridors).bindTooltip(corridor.name, {
        sticky: true
      });
    })

  }

  private drawPaths(paths: MovementPath[]) {
    paths.forEach(path => {
        let polylinePoints = [];
        path.points.forEach(point => {
          const pointPosition = L.latLng([this.getMapCoordinates(point.y, this.mapOriginY),this.getMapCoordinates(point.x, this.mapOriginX)]);
          polylinePoints.push(pointPosition);
        });
        new L.Polyline(polylinePoints).addTo(this.movementPaths).bindTooltip(path.name, {
          sticky: true
        });
      }
    )
  }

  private drawStand(stands: Stand[]) {
    stands.forEach(stand => {
      const position = [
        this.getMapCoordinates(Number(stand.pose.position.y), this.mapOriginY),
        this.getMapCoordinates(Number(stand.pose.position.x), this.mapOriginX)
      ];
      let circleMarker = L.marker(position, {icon: CIRCLEBACK});
      circleMarker.addTo(this.standLayer);
      let marker = L.marker(position, {icon: STANDICON});
      marker.addTo(this.standLayer);
      let orientationMarker = L.marker(position, {
        icon: ARROWICON,
        rotationAngle: axisAngleFromQuaternion(stand.pose.orientation) * 180 / Math.PI
      });
      orientationMarker.addTo(this.standLayer);
      marker.bindPopup(
        'Stand Details<br />Position x: '
        + stand.pose.position.x
        + '<br />Position y: ' +
        +stand.pose.position.y
        + '<br />Orientation: ' +
        +stand.pose.position.z
        + '<br />Status: ' +
        +stand.standStatus.name
        + '<br />Parking type: ' +
        +stand.parkingType.name
        + '<br />Stand type: ' +
        +stand.standType.name);
    })
  }

  private drawGraph(graph: Graph) {
    let existingWaypoints = [];
    graph.edges.forEach(edge => {
      const vertPosA = L.latLng([this.getMapCoordinates(edge.vertexA.posY, this.mapOriginY), this.getMapCoordinates(edge.vertexA.posX, this.mapOriginX)]);
      const vertPosB = L.latLng([this.getMapCoordinates(edge.vertexB.posY, this.mapOriginY), this.getMapCoordinates(edge.vertexB.posX, this.mapOriginX)]);
      if (!existingWaypoints.includes(vertPosA)) {
        const marker = new L.marker(vertPosA, {icon: WAYPOINTICON});
        marker.addTo(this.graphs);
        existingWaypoints.push(vertPosA);
      }
      if (!existingWaypoints.includes(vertPosB)) {
        const marker = new L.marker(vertPosB, {icon: WAYPOINTICON});
        marker.addTo(this.graphs);
        existingWaypoints.push(vertPosB);
      }

      const color = edge.isActive? 'green' : 'red';
      const weight = edge.narrow? 6 : 12;

      const polyLine = new L.polyline([vertPosA, vertPosB],
        {color: color, weight: weight, opacity: 0.8, smoothFactor: 1});
      polyLine.addTo(this.graphs);

    });
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
    polygonik.addTo(this.polygons);
  }


  private drawPolygons(polygon: Polygon[]) {
    polygon.forEach(object => {
      this.drawPolygon(object);
    });
  }

  private drawRobots(robots) {
    robots.forEach(robot => {
      if(robot.pose !=null){
        const position = L.latLng([
          this.getMapCoordinates(robot.pose.position.y, this.mapOriginX),
          this.getMapCoordinates(robot.pose.position.x, this.mapOriginY)
        ]);
        let marker = L.marker(position, {icon: ROBOTICON});
        marker.addTo(this.robotStatusLayer);
        marker.bindPopup(
          'Robot Details <br />Name : '
          + robot.id
          + '<br />Position x: '
          + this.getRealCoordinates(this.robotMarkers[robot.id].getLatLng().lng, this.mapOriginX)
          + '<br />Position y: ' +
          +this.getRealCoordinates(this.robotMarkers[robot.id].getLatLng().lat, this.mapOriginY) + '<br />Status: ' + this.showRobotStatus(robot.status));
        this.robotMarkers[robot.id] = marker;
        this.robotStatusLayer.addTo(this.map);
      }
    })
  }

  private showRobotStatus(statuses: RobotStatus[]){
    this.robotStatus = [];
    statuses.forEach(status=>{
      this.robotStatus.push(status.name);
    });
    return this.robotStatus;
  }

  private updateRobots(robots) {
    //this.robotStatusLayer.clearLayers();
    robots.forEach(robot => {
      if(robot.pose !=null){
        const position = L.latLng([
          this.getMapCoordinates(robot.pose.position.y, this.mapOriginX),
          this.getMapCoordinates(robot.pose.position.x, this.mapOriginY)
        ]);
        if(robot.id in this.robotMarkers) {
          this.robotMarkers[robot.id].setLatLng(position);
          // console.log(position);
          this.robotMarkers[robot.id]._popup.setContent(
            'Robot Details <br />Name : '
            + robot.id
            + '<br />Position x: '
            + this.getRealCoordinates(this.robotMarkers[robot.id].getLatLng().lng, this.mapOriginX)
            + '<br />Position y: ' +
            +this.getRealCoordinates(this.robotMarkers[robot.id].getLatLng().lat, this.mapOriginY) + '<br />Status: ' + this.showRobotStatus(robot.status));
        }
        else {
          let marker = L.marker(position, {icon: ROBOTICON});
          marker.addTo(this.robotStatusLayer);
          marker.bindPopup(
            'Robot Details<br />Position x: '
            + this.getRealCoordinates(marker.getLatLng().lng, this.mapOriginX)
            + '<br />Position y: ' +
            +this.getRealCoordinates(marker.getLatLng().lat, this.mapOriginY) + '<br />Status: ' + this.showRobotStatus(robot.status));
          this.robotMarkers[robot.id] = marker;
          this.robotStatusLayer.addTo(this.map);
        }
      }
    })
  }

  private parseToJpeg(image: any): string {
    return 'data:image/jpg;base64,' + image;
  }

  getMapCoordinates(value, origin) {
    return (value - origin) * (1 / this.mapResolution) * ( this.mapContainerSize / this.imageResolution)
  }

  getRealCoordinates(value: number, origin : number) {
    return (value * this.mapResolution * (this.imageResolution /  this.mapContainerSize) + origin)
  }

  private updateRobotMarkerPositions(robots: number[][]) {
    for (let i = 0; i < robots.length; i++) {
      const position = [
        this.getMapCoordinates(robots[i][0], this.mapOriginX),
        this.getMapCoordinates(robots[i][1], this.mapOriginY)
      ];
      this.robotMarkers[i].setLatLng(position);
    }
  }
}
