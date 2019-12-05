import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-rotatedmarker';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  //Example data
  //Leaflet accepts coordinates in [y,x]
  private robotPosXY = [992, 992];
  private robotMarkers = [];
  private imageResolution = 1984;

  private map;

  constructor() {
  }

  ngOnInit() {
    // this.mapService.getMap('1').subscribe(
    //   data => this.convertToMap(data)
    // );
    this.initMap();
    const robotsArray = [this.robotPosXY];
    this.createRobotMarkers(robotsArray, 0.01);
    setTimeout(() => this.updateRobotMarkerPositions([[100, 992]], 0.01), 3000);
  }

  private convertToMap(image: any): void {
    const base64Data = btoa(image);
    const imageURL = 'data:image/jpg;base64,' + base64Data;
  }

  private initMap(): void {
    const imageUrl = './assets/maps/sim_map.jpg';
    const imageBounds = [[0, 0], [800, 800]];
    this.map = L.map('map', {
      crs: L.CRS.Simple
    });
    L.imageOverlay(imageUrl, imageBounds).addTo(this.map);
    this.map.fitBounds(imageBounds);
  }

  private createRobotMarkers(robots: number[][], resolution: number) {
    robots.forEach(robot => {
      const position = [robot[1] * (800 / this.imageResolution), robot[0] * (800 / this.imageResolution)];
      this.robotMarkers.push(
        L.marker(position, {
          rotationAngle: 45
        }).addTo(this.map)
      )
    })
  }

  private updateRobotMarkerPositions(robots: number[][], resolution: number) {
    for (let i = 0; i < robots.length; i++) {
      const position = [robots[i][1] * (800 / 1984), robots[i][0] * (800 / 1984)];
      this.robotMarkers[i].setLatLng(position);
    }
  }
}
