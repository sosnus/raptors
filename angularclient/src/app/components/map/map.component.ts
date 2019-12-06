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
  private robotPosXY = [19.84/2, 19.84/2];
  private robotMarkers = [];
  private imageResolution = 1984; //temp, should be 1;

  private map;
  private imageURL = './assets/maps/sim_map.jpg';

  constructor() {
  }

  ngOnInit() {
    // this.mapService.getMap('1').subscribe(
    //   data => {
    //     this.imageURL = this.parseToJpeg(data);
    //     this.getImageSize(this.imageURL).then(
    //       (imageSize: number[]) => {
    //         this.imageResolution = imageSize[0];
    //
    //       }
    //     );
    //   }
    // );
    this.initMap();
    const robotsArray = [this.robotPosXY];
    this.createRobotMarkers(robotsArray, 0.01);
    //setTimeout(() => this.updateRobotMarkerPositions([[100, 992]], 0.01), 3000);
  }

  private parseToJpeg(image: any): string {
    const base64Data = btoa(image);
    return 'data:image/jpg;base64,' + base64Data;
  }

  private getImageSize(fileURL: string): Promise<number[]> {
    const img = new Image;
    img.src = fileURL;
    return new Promise(img.onload = () => {
      return [img.width, img.height];
    });
  }

  private initMap(): void {
    const imageBounds = [[0, 0], [800, 800]];
    this.map = L.map('map', {
      crs: L.CRS.Simple
    });
    L.imageOverlay(this.imageURL, imageBounds).addTo(this.map);
    this.map.fitBounds(imageBounds);
  }

  private createRobotMarkers(robots: number[][], resolution: number) {
    robots.forEach(robot => {
      const markerIcon = L.icon({iconUrl: '/assets/icons/drone.png', iconSize: [35,35]});
      const position = [
        robot[1] * (1 / resolution) * (800 / this.imageResolution),
        robot[0] * (1 / resolution) * (800 / this.imageResolution)];
      this.robotMarkers.push(
        L.marker(position, {icon: markerIcon}).addTo(this.map)
      )
    })
  }

  private updateRobotMarkerPositions(robots: number[][], resolution: number) {
    for (let i = 0; i < robots.length; i++) {
      const position = [
        robots[i][1] * (1 / resolution) * (800 / this.imageResolution),
        robots[i][0] * (1 / resolution) * (800 / this.imageResolution)];
      this.robotMarkers[i].setLatLng(position);
    }
  }
}
