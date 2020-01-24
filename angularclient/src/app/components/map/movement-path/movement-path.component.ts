import {Component, OnInit} from '@angular/core';
import {MapService} from "../../../services/map.service";
import {MovementPathService} from "../../../services/movementPath.service";
import * as L from 'leaflet';
import {MovementPath} from "../../../model/MapAreas/MovementPaths/MovementPath";
import {UniversalPoint} from "../../../model/MapAreas/UniversalPoint";
import {StoreService} from "../../../services/store.service";
import {Marker} from "leaflet/src/layer/marker/Marker";


@Component({
  selector: 'app-movement-path',
  templateUrl: './movement-path.component.html',
  styleUrls: ['./movement-path.component.css']
})
export class MovementPathComponent implements OnInit {

  dataLoaded = false;//todo ines
  private imageResolution;
  private map;
  private mapResolution = 0.01;//TODO()
  private imageURL = '';
  private readonly context;
  private polyline: L.polyline = null;
  private vertices: Marker[] = [];

  constructor(private mapService: MapService,
              private movementPathService: MovementPathService,
              private store: StoreService) {
     this.context = this;
  }

  ngOnInit() {
    this.loadMap();
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
    const imageBounds = [[0, 0], [800, 800]];
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      contextmenu: true,
    });
    L.imageOverlay(this.imageURL, imageBounds).addTo(this.map);
    L.easyButton('fa-crosshairs', function (btn, map) {
      map.setView([400, 400], 0);
    }).addTo(this.map);
    this.map.fitBounds(imageBounds);

    this.map.on('click', e => {
      const markerIcon = L.icon({
        iconUrl: '/assets/icons/position.png',
        iconSize: [36, 36],
        iconAnchor: [36 / 2, 36 / 2]
      });

      let marker = new L.marker(e.latlng, {
        draggable: true,
        icon: markerIcon
      });
      if (this.polyline == null) {
        this.polyline = new L.Polyline([]).addTo(this.map);
      }
      marker.addTo(this.map)
      this.vertices.push(marker);
      this.polyline.addLatLng(e.latlng);
    });
  }

  cancelMovementPath() {
    this.map.removeLayer(this.polyline);
    this.polyline=null;
    this.vertices.forEach(e => {
      this.map.removeLayer(e);
    })
    this.vertices = [];
  }

  private getRealCoordinates(value) {
    return (value * this.mapResolution * (this.imageResolution / 800) - ((this.imageResolution * this.mapResolution) / 2))
  }

  saveMovementPath() {
    // konwersja latlng na punkty z mapy
    let universalPoints: UniversalPoint[] = [];
    this.polyline.getLatLngs().forEach(lang => {
      let universalPoint: UniversalPoint = new UniversalPoint(
        this.getRealCoordinates(lang.lat),
        this.getRealCoordinates(lang.lng),
        0);
      universalPoints.push(universalPoint)
    });

    let movementPath = new MovementPath('movement-path-final-test',universalPoints);
    console.log("Sent movement path to db");
    this.movementPathService.save(movementPath).subscribe(result => console.log(result));
    this.cancelMovementPath();
  }


}
