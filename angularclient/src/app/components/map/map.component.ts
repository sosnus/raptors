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

export const WAYPOINTICON = L.icon({
  iconUrl: '/assets/icons/position.png',
  iconSize: [36, 36],
  iconAnchor: [36 / 2, 36 / 2]
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
  private graphs = L.featureGroup();

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
    'Error!': L.tileLayer.wms(),
  };

  //Leaflet accepts coordinates in [y,x]
  private robotMarkers = [];
  private mapID = '5de6d25552cace719bf775cf';//TODO()
  private graphID = '5e0010bb0831a2671739f734';//TODO()
  private graph: Graph;
  private imageResolution;
  private mapResolution = 0.01;//TODO()
  private map;
  private imageURL = '';
  private robotIP = '';

  constructor(private mapService: MapService,
              private robotService: RobotService,
              private storeService: StoreService,
              private graphService: GraphService) {
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

  private afterMapLoaded(data: String) {
    this.dataLoaded = true;
    this.imageURL = this.parseToJpeg(data);
    this.initMap();


    this.storeService.getRobotIP('5dfb452fd9068433d5983610').subscribe(
      rob => {
        this.robotDataloaded = true;
        this.robotIP = rob;
        console.log("Pobieram IP robota: " + this.robotIP);
      }
    );

    this.graphService.getGraph(this.graphID).subscribe(
      graph => {
        console.log(graph);
        this.graph = graph;
        this.drawGraph(graph)
      }
    );

    const img = new Image;
    img.src = this.imageURL;
    img.onload = () => {
      this.imageResolution = img.width;
      this.createRobotMarkers(this.robots);
    }
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

  private parseToJpeg(image: any): string {
    return 'data:image/jpg;base64,' + image;
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

  private createRobotMarkers(robots) {
    robots.forEach(robot => {
      const markerIcon = L.icon({iconUrl: '/assets/icons/robot_icon.png', iconSize: [36, 36], iconAnchor: [0, 0]});
      const position = [
        this.getMapCoordinates(Number(robot.y)),
        this.getMapCoordinates(Number(robot.x))
      ];
      const marker = L.circle(position, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 10
      })/*.addTo(this.map)*/;
      var currentShelter = marker;
      currentShelter.addTo(this.robotStatusLayer);
      marker.bindPopup("Placeholder:\n Robot Details\n");
      this.robotMarkers.push(marker);
      this.robotStatusLayer.addTo(this.map);

      // L.marker(position, {icon: markerIcon}).addTo(this.map)
      /*L.marker(position, {icon: markerIcon}).on('click', this.markerOnClick.bind(this)).addTo(this.map));*/

    })
  }

  getMapCoordinates(value) {
    return ((value) + (this.imageResolution * this.mapResolution) / 2) * (1 / this.mapResolution) * (800 / this.imageResolution)
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
