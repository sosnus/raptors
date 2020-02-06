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

  //Example data
  private robots = [
    {
      'id': '0',
      'x': '3.05336356163',
      'y': '2.6747405529',
      'rot': '-90.2808007761'
    },
    {
      'id': '1',
      'x': '2.99178433418',
      'y': '-2.6739563942',
      'rot': '179.770314899'
    },
    {
      'id': '2',
      'x': '-1.70923388004',
      'y': '-2.60913944244',
      'rot': '88.1495543791'
    },
    {
      'id': 'SomeID4',
      'x': '-1.43146789074',
      'y': '2.68175768852',
      'rot': '0.183157256614'
    }
  ];


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


  //Map related variables
  private map;
  private imageURL = '';
  private mapResolution = 0.01;//TODO()
  private imageResolution;
  private mapContainerSize = 800;

  private robotIP = '';

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

    this.map.on('overlayadd', function (eo) {
      if (eo.name === 'Korytarze') {
        console.log('Fired korytarze');
      }
      if (eo.name === 'Sciezki') {
        this.removeLayer(eo.layer);
        const layer = L.featureGroup();
        Object.keys(eo.layer._layers).forEach(function (key) {
          layer.addLayer(eo.layer._layers[key]);
        });
        this.addLayer(layer);
      }
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

    /*    this.storeService.getRobotIP('5dfb452fd9068433d5983610').subscribe(
          rob => {
            this.robotDataloaded = true;
            this.robotIP = rob;
            //console.log("Pobieram IP robota: " + this.robotIP);
          }
        );*/

    this.graphService.getAll().subscribe(
      graphs => {
        graphs.map(graph => this.drawGraph(graph))

      }
    );

    this.polygonService.getPolygons().subscribe(
      polygons => {
        console.log(polygons);
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
      this.drawRobots(this.robots);
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
        const pointPosition = L.latLng([this.getMapCoordinates(point.x), this.getMapCoordinates(point.y)]);
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
          const pointPosition = L.latLng([this.getMapCoordinates(point.x), this.getMapCoordinates(point.y)]);
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
      console.log(stand);
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
      const position = [
        this.getMapCoordinates(Number(robot.y)),
        this.getMapCoordinates(Number(robot.x))
      ];
      let marker = L.marker(position, {icon: ROBOTICON});
      marker.addTo(this.robotStatusLayer);
      marker.bindPopup(
        'Robot Details<br />Position x: '
        + this.getRealCoordinates(marker.getLatLng().lng)
        + '<br />Position y: ' +
        +this.getRealCoordinates(marker.getLatLng().lat));
      this.robotMarkers.push(marker);
      this.robotStatusLayer.addTo(this.map);
    })
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
