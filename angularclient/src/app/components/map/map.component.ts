import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
/*
import 'leaflet-rotatedmarker';
*/
import {MapService} from "../../services/map.service";
import {RobotService} from "../../services/robot.service";
import {StoreService} from "../../services/store.service";
import {GraphService} from "../../services/graph.service";
import {Graph} from "../../model/Graphs/Graph";
import {PolygonService} from "../../services/polygon.service";
import {Polygon} from "../../model/MapAreas/Polygons/Polygon";
import {StandService} from "../../services/stand.service";
import {Stand} from "../../model/Stand/Stand";

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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  dataLoaded = false;
  robotDataloaded = false;

  private robotStatusLayer = L.featureGroup();
  private standLayer = L.featureGroup();
  private graphs = L.featureGroup();
  private polygons = L.featureGroup();

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
  private robotStatus = {
    Online: this.robotStatusLayer,
    Grafy: this.graphs,
    Obszary: this.polygons,
    Stanowiska: this.standLayer,
  };

  //Leaflet accepts coordinates in [y,x]
  private robotMarkers = [];
  private mapID = '5de6d25552cace719bf775cf';//TODO()
  private graphID = '5e177dc681c34611534d8c79';//TODO()
  private polygonID = '5e172dd80dc6500812feff69';//TODO()
  private mapResolution = 0.01;//TODO()
  private graph: Graph;
  private polygon: Polygon;
  private allpolygons: Polygon[];
  private imageResolution;

  private map;
  private imageURL = '';
  private robotIP = '';

  constructor(private mapService: MapService,
              private robotService: RobotService,
              private storeService: StoreService,
              private graphService: GraphService,
              private polygonService: PolygonService,
              private standService: StandService) {
  }

  ngOnInit() {
    if (localStorage.getItem(this.mapID) !== null) {
      this.afterMapLoaded(localStorage.getItem(this.mapID))
    } else {
      this.mapService.getMap(this.mapID).subscribe(
        data => {
          this.afterMapLoaded(data);
          localStorage.setItem(this.mapID, data)
        }
      );
    }
    //setTimeout(() => this.updateRobotMarkerPositions([[100, 992]], 0.01), 3000);
  }

  private initMap(): void {

    const imageBounds = [[0, 0], [800, 800]];
    this.map = L.map('map', {
      crs: L.CRS.Simple
    });
    L.imageOverlay(this.imageURL, imageBounds).addTo(this.map);
    this.map.fitBounds(imageBounds);
    L.control.layers(this.robotStatus).addTo(this.map);
  }

  private afterMapLoaded(data: String) {
    this.dataLoaded = true;
    this.imageURL = this.parseToJpeg(data);
    this.initMap();

    this.storeService.getRobotIP('5dfb452fd9068433d5983610').subscribe(
      rob => {
        this.robotDataloaded = true;
        this.robotIP = rob;
        //console.log("Pobieram IP robota: " + this.robotIP);
      }
    );

    this.graphService.getGraph(this.graphID).subscribe(
      graph => {
        //console.log(graph);
        this.graph = graph;
        this.drawGraph(graph)
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
      stands =>{
        this.drawStand(stands);
      }
    );

    const img = new Image;
    img.src = this.imageURL;
    img.onload = () => {
      this.imageResolution = img.width;
      this.drawRobots(this.robots);
    }
  }

  private drawStand(stands: Stand[]) {
    stands.forEach( stand =>{
      console.log(stand);
      const position = [
        this.getMapCoordinates(Number(stand.pose.position.y)),
        this.getMapCoordinates(Number(stand.pose.position.x))
      ];
      let marker = L.marker(position, {icon: STANDICON});
      marker.addTo(this.standLayer);
      marker.bindPopup(
        "Stand Details<br />Position x: "
        + stand.pose.position.x
        + "<br />Position y: " +
        + stand.pose.position.y
        + "<br />Orientation: " +
        + stand.pose.position.z
        + "<br />Status: " +
        + stand.standStatus.name
        + "<br />Parking type: " +
        + stand.parkingType.name
        + "<br />Stand type: " +
        + stand.standType.name);
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

  private drawPolygon(polygon: Polygon){
    let existingPolygonpoints = [];
    polygon.points.forEach(point => {
      const pointPosition = L.latLng([this.getMapCoordinates(point.x), this.getMapCoordinates(point.y)]);
      existingPolygonpoints.push(pointPosition);
    });
    let polygonik = L.polygon(existingPolygonpoints, {color: 'red'}).addTo(this.map);
    polygonik.addTo(this.polygons);
  }


  private drawPolygons(polygon: Polygon[]){
    polygon.forEach(object=> {
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
        "Robot Details<br />Position x: "
        + this.getRealCoordinates(marker.getLatLng().lng)
        + "<br />Position y: " +
        + this.getRealCoordinates(marker.getLatLng().lat));
      this.robotMarkers.push(marker);
      this.robotStatusLayer.addTo(this.map);

      // L.marker(position, {icon: markerIcon}).addTo(this.map)
      /*L.marker(position, {icon: markerIcon}).on('click', this.markerOnClick.bind(this)).addTo(this.map));*/

    })
  }

  private parseToJpeg(image: any): string {
    return 'data:image/jpg;base64,' + image;
  }

  getMapCoordinates(value) {
    return ((value) + (this.imageResolution * this.mapResolution) / 2) * (1 / this.mapResolution) * (800 / this.imageResolution)
  }

  getRealCoordinates(value: number) {
    return (value * this.mapResolution * (this.imageResolution / 800) - ((this.imageResolution * this.mapResolution) / 2))
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
