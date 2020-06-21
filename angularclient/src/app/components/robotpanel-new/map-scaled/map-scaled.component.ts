import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { MapService } from '../../../services/map.service';
import '../../../../../node_modules/leaflet-contextmenu/dist/leaflet.contextmenu.js'
import '../../../../../node_modules/leaflet-path-transform/dist/L.Path.Transform.js'
import '../../../../lib/leaflet-circle-to-polygon/leaflet.circle.topolygon-src.js'
import '../../../../lib/leaflet-easybutton/src/easy-button';
import '../../../../lib/leaflet-easybutton/src/easy-button.css';

import 'leaflet-path-transform';
import { StoreService } from "../../../services/store.service";
import { Robot } from "../../../model/Robots/Robot";
import { ROBOTICON } from "../../map/map.component";

declare var L: any;

@Component({
  selector: 'app-map-scaled',
  templateUrl: './map-scaled.component.html',
  styleUrls: ['./map-scaled.component.css']
})
export class MapScaledComponent implements OnInit, OnChanges {


  @Input()
  mapContainerSize: number = 800;
  @Input()
  robot: Robot;

  public dataLoaded = false;
  public mapLoaded = false;
  private imageResolution;
  private map;
  private mapResolution = 0.01;//TODO()
  private imageURL = '';
  private marker;


  constructor(private mapService: MapService,
    private store: StoreService) {
  }

  ngOnInit() {
    this.loadMap();
  }

  ngOnChanges(changes: { robot: SimpleChange }) {
    // Extract changes to the input property by its name
    if (this.mapLoaded) {
      if (changes.robot.currentValue) {
        const newRobot: Robot = changes.robot.currentValue;
        this.drawRobot(newRobot)
      }
    }
  }

  private loadMap() {
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
  }

  private afterMapLoaded(data: String) {
    this.dataLoaded = true;
    this.imageURL = 'data:image/jpg;base64,' + data;
    this.initMap();

    const img = new Image;
    img.src = this.imageURL;
    img.onload = () => {
      this.imageResolution = img.width;
    }
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
      map.setView([this.mapContainerSize / 2, this.mapContainerSize / 2], 0);
    }).addTo(this.map);
    this.map.fitBounds(imageBounds);
    this.mapLoaded = true;
  }


  private drawRobot(robot: Robot) {
    if (this.marker) {
      this.map.removeLayer(this.marker)
    }
    const position = [
      this.getMapCoordinates(Number(robot.pose.position.y)),
      this.getMapCoordinates(Number(robot.pose.position.x))
    ];
    this.marker = L.marker(position, { icon: ROBOTICON });
    this.marker.addTo(this.map);
    this.marker.bindPopup(
      "Robot Details<br />Position x: "
      + this.getRealCoordinates(this.marker.getLatLng().lng)
      + "<br />Position y: " +
      +this.getRealCoordinates(this.marker.getLatLng().lat));
  }

  getRealCoordinates(value: number) {
    return (value * this.mapResolution * (this.imageResolution / this.mapContainerSize) - ((this.imageResolution * this.mapResolution) / 2))
  }

  getMapCoordinates(value) {
    return ((value) + (this.imageResolution * this.mapResolution) / 2) * (1 / this.mapResolution) * (this.mapContainerSize / this.imageResolution)
  }

  getRounded(value) {
    if (value) return value.toFixed(4);
  }
}
