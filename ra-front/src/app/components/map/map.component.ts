import {Component, OnDestroy, OnInit} from '@angular/core';
import * as L from 'leaflet';
import '../../../../node_modules/leaflet-rotatedmarker/leaflet.rotatedMarker.js'
import '../../../lib/leaflet-easybutton/src/easy-button';
import '../../../lib/leaflet-easybutton/src/easy-button.css';
import { MapService } from '../../services/map.service';
import { RobotService } from '../../services/robot.service';
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
import { fromEvent, Subscription } from 'rxjs';
import {Robot} from "../../model/Robots/Robot";
import {RobotStatus} from "../../model/Robots/RobotStatus";

export const WAYPOINTICON = L.icon({
  iconUrl: '/assets/icons/position.png',
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
  private robotMarkers = [];
  private allpolygons: Polygon[];
  private robotStatus : string[] = [];

  //Map related variables
  private map;
  private imageURL = '';
  private mapResolution = 0.01;//TODO()
  private imageResolution;
  private mapContainerSize = 800;

  //private robotIP = '';

  constructor(private mapService: MapService,
              private robotService: RobotService,
              private storeService: StoreService,
              private graphService: GraphService,
              private polygonService: PolygonService,
              private standService: StandService,
              private store: StoreService,
              private corridorService: CorridorService,
              private pathsService: MovementPathService) {
  }

  ngOnInit() {
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
    //setTimeout(() => this.updateRobotMarkerPositions([[100, 992]], 0.01), 3000);
    this.subscription = fromEvent(window, 'resize').subscribe(() => this.onResize());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
      this.robotService.getAll().subscribe(
        robots=>{
          this.drawRobots(robots);

        }
      );
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
        const pointPosition = L.latLng([this.getMapCoordinates(point.y), this.getMapCoordinates(point.x)]);
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
          const pointPosition = L.latLng([this.getMapCoordinates(point.y),this.getMapCoordinates(point.x)]);
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
        this.getMapCoordinates(Number(stand.pose.position.y)),
        this.getMapCoordinates(Number(stand.pose.position.x))
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
      const vertPosA = L.latLng([this.getMapCoordinates(edge.vertexA.posY), this.getMapCoordinates(edge.vertexA.posX)]);
      const vertPosB = L.latLng([this.getMapCoordinates(edge.vertexB.posY), this.getMapCoordinates(edge.vertexB.posX)]);
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
      const color = edge.biDirected ? 'yellow' : 'red';
      const polyLine = new L.polyline([vertPosA, vertPosB],
        {color: color, weight: 7, opacity: 0.8, smoothFactor: 1});
      polyLine.addTo(this.graphs);
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
          this.getMapCoordinates(robot.pose.position.y),
          this.getMapCoordinates(robot.pose.position.x)
        ]);
        let marker = L.marker(position, {icon: ROBOTICON});
        marker.addTo(this.robotStatusLayer);
        marker.bindPopup(
          'Robot Details<br />Position x: '
          + this.getRealCoordinates(marker.getLatLng().lng)
          + '<br />Position y: ' +
          +this.getRealCoordinates(marker.getLatLng().lat) + '<br />Status: ' + this.showRobotStatus(robot.status));
        this.robotMarkers.push(marker);
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

  private parseToJpeg(image: any): string {
    return 'data:image/jpg;base64,' + image;
  }

  getMapCoordinates(value) {
    return ((value) + (this.imageResolution * this.mapResolution) / 2) * (1 / this.mapResolution) * ( this.mapContainerSize / this.imageResolution)
  }

  getRealCoordinates(value: number) {
    return (value * this.mapResolution * (this.imageResolution /  this.mapContainerSize) - ((this.imageResolution * this.mapResolution) / 2))
  }

  private updateRobotMarkerPositions(robots: number[][]) {
    for (let i = 0; i < robots.length; i++) {
      const position = [
        this.getMapCoordinates(robots[i][1]),
        this.getMapCoordinates(robots[i][1])
      ];
      this.robotMarkers[i].setLatLng(position);
    }
  }
}
