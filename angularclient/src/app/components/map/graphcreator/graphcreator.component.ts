import { Component, OnInit } from '@angular/core';
import { MapService } from '../../../services/map.service';
import * as L from 'leaflet';
import { Graph } from '../../../model/Graphs/Graph';

@Component({
  selector: 'app-graphcreator',
  templateUrl: './graphcreator.component.html',
  styleUrls: ['./graphcreator.component.css']
})
export class GraphcreatorComponent implements OnInit {

  dataLoaded = false;
  private imageResolution;
  private map;
  private imageURL = '';
  private mapID = '5de6d25552cace719bf775cf';

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.loadMap();
  }

  private loadMap() {
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
  }

  private afterMapLoaded(data: String) {
    this.dataLoaded = true;
    this.imageURL = 'data:image/jpg;base64,' + data;
    this.initMap();

    const img = new Image;
    img.src = this.imageURL;
    img.onload = () => {
      this.imageResolution = img.width;
      //
    }
  }

  private initMap(): void {
    const imageBounds = [[0, 0], [800, 800]];
    this.map = L.map('map', {
      crs: L.CRS.Simple
    });
    L.imageOverlay(this.imageURL, imageBounds).addTo(this.map);
    this.map.fitBounds(imageBounds);
  }

}
