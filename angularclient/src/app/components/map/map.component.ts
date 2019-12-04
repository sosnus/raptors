import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-easybutton';
import { MapService } from '../../services/map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private map;

  constructor() {
  }

  ngOnInit() {
    // this.mapService.getMap('1').subscribe(
    //   data => this.convertToMap(data)
    // );
    this.initMap();
  }

  private convertToMap(image: any): void {
    const base64Data = btoa(image);
    const imageURL = 'data:image/pgm;base64,' + base64Data;
  }

  private initMap(): void {
    const imageUrl = 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg';
    const imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
    this.map = L.map('map', {
      crs: L.CRS.Simple
      // center: [39.8282, -98.5795],
      // zoom: 3
    });

    L.imageOverlay(imageUrl, imageBounds).addTo(this.map);
    this.map.fitBounds(imageBounds);

    const helloPopup = L.popup().setContent('Hello World!');

    L.easyButton('<span class="star">&curren;</span>', (btn, map) => {
      helloPopup.setLatLng(map.getCenter()).openOn(map);
    }).addTo( this.map );


    // const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 19,
    // });
    //
    // tiles.addTo(this.map);
  }

}
