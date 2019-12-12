import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
/*
import 'leaflet-rotatedmarker';
*/
import {MapService} from "../../services/map.service";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  dataLoaded = false;

  //Example data
  //Leaflet accepts coordinates in [y,x]
  private robotPosXY = [9.92, 9.92];
  private robotMarkers = [];
  private imageResolution = 1984; //temp, should be 1;

  private map;
  private imageURL = './assets/maps/sim_map.jpg';

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.getRobotPosition(3.05336356163, 2.6747405529);

    this.mapService.getMap('5de6d25552cace719bf775cf').subscribe(
      data => {
        this.dataLoaded = true;
        this.imageURL = this.parseToJpeg(data);

        this.initMap();

        const img = new Image;
        img.src = this.imageURL;
        img.onload = () => {
          this.imageResolution = img.width;
          console.log(this.imageResolution)
          const robotsArray = [this.robotPosXY];
          this.createRobotMarkers(robotsArray, 0.01);
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
  }

  private createRobotMarkers(robots: number[][], resolution: number) {
    robots.forEach(robot => {
      const markerIcon = L.icon({iconUrl: '/assets/icons/drone.png', iconSize: [35, 35], iconAnchor: [0.0]});
      const position = [
        robot[1] * (1 / resolution) * (800 / this.imageResolution),
        robot[0] * (1 / resolution) * (800 / this.imageResolution)];
      this.robotMarkers.push(
        L.marker(position, {icon: markerIcon}).addTo(this.map)
        /*L.marker(position, {icon: markerIcon}).on('click', this.markerOnClick.bind(this)).addTo(this.map));*/
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

  private getRobotPosition(posX: number, posY: number) {
    this.robotPosXY = [9.92 + posY, 9.92 + posX];
  }

  /*private markerOnClick(e) {
    this.robotOptions([[this.robotPosXY[0]+1, this.robotPosXY[1]+1]], 0.01);
    this.robotOptions([[this.robotPosXY[0]+1, this.robotPosXY[1]]], 0.01);
    this.robotOptions([[this.robotPosXY[0]+1, this.robotPosXY[1]-1]], 0.01);
  }

  private robotOptions(robots: number[][], resolution: number) {
    if(this.clickMarker < 3){
      const markerIcon = L.icon({iconUrl: '/assets/icons/drone.png', iconSize: [35,35]});
      for (let i = 0; i < robots.length; i++) {
        const position = [
          robots[i][1] * (1 / resolution) * (800 / this.imageResolution),
          robots[i][0] * (1 / resolution) * (800 / this.imageResolution)];
        this.robotMarkers.push(
          L.marker(position, {icon: markerIcon}).bindPopup('Uruchom opcje').openPopup().addTo(this.map));
      }
      this.clickMarker = this.clickMarker + 1;
    }

    if(this.clickMarker >= 3){
      //remove additional markers (options icon)
    }
  }*/

}
