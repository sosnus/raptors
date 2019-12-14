import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
/*
import 'leaflet-rotatedmarker';
*/
import {MapService} from "../../services/map.service";
import {RobotService} from "../../services/robot.service";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  dataLoaded = false;
  robotDataloaded=false;

  private robotStatusLayer = L.featureGroup();

  //Example data
  private robots = [
    {
      'id': '0',
      'x': '3.05336356163',
      'y': '2.6747405529',
      'rot':'-90.2808007761'
    },
    {
      'id': '1',
      'x': '2.99178433418',
      'y': '-2.6739563942',
      'rot':'179.770314899'
    },
    {
      'id': '2',
      'x': '-1.70923388004',
      'y': '-2.60913944244',
      'rot':'88.1495543791'
    },
    {
      'id': 'SomeID4',
      'x': '-1.43146789074',
      'y': '2.68175768852',
      'rot':'0.183157256614'
    }
  ];

  //filters for the map
  private robotStatus = {
    Online: this.robotStatusLayer,

    'Warning!': L.tileLayer.wms(),

    'Error!': L.tileLayer.wms(),
  };

  //Leaflet accepts coordinates in [y,x]
  private robotMarkers = [];
  private imageResolution;

  private map;
  private imageURL = '';
  private robotIP ='';

  constructor(private mapService: MapService, private robotService: RobotService) {
  }

  ngOnInit() {
        this.mapService.getMap('5de6d25552cace719bf775cf').subscribe(
      data => {
        this.dataLoaded = true;
        this.imageURL = this.parseToJpeg(data);
        this.initMap();


        this.robotService.getRobot('5df4d91c68dd00790d601671').subscribe(
          rob => {
            this.robotDataloaded = true;
            this.robotIP = rob;
            console.log("Pobieram IP robota: "+this.robotIP);
          }
        );

        const img = new Image;
        img.src = this.imageURL;
        img.onload = () => {
          this.imageResolution = img.width;
          this.createRobotMarkers(this.robots, 0.01);
        }

      }
    );

    //setTimeout(() => this.updateRobotMarkerPositions([[100, 992]], 0.01), 3000);
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

  private createRobotMarkers(robots, resolution: number) {
    robots.forEach(robot => {
      const markerIcon = L.icon({iconUrl: '/assets/icons/robot_icon.png', iconSize: [36, 36], iconAnchor: [0, 0]});
      const position = [
        (Number(robot.y)+(this.imageResolution*resolution)/2) * (1 / resolution) * (800 / this.imageResolution),
        (Number(robot.x)+(this.imageResolution*resolution)/2) * (1 / resolution) * (800 / this.imageResolution),
       ];
      const marker = L.circle(position, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 10
      })/*.addTo(this.map)*/;
      var currentShelter = marker;
      currentShelter.addTo(this.robotStatusLayer);
      marker.bindPopup("Placeholder:\n Robot Details");
      this.robotMarkers.push(marker);
      this.robotStatusLayer.addTo(this.map);

      // L.marker(position, {icon: markerIcon}).addTo(this.map)
        /*L.marker(position, {icon: markerIcon}).on('click', this.markerOnClick.bind(this)).addTo(this.map));*/

    })
  }

  private updateRobotMarkerPositions(robots: number[][], resolution: number) {
    for (let i = 0; i < robots.length; i++) {
      const position = [
        (robots[i][1]+(this.imageResolution*resolution)/2) * (1 / resolution) * (800 / this.imageResolution),
        (robots[i][0]+(this.imageResolution*resolution)/2) * (1 / resolution) * (800 / this.imageResolution)];
      this.robotMarkers[i].setLatLng(position);
    }
  }
}
