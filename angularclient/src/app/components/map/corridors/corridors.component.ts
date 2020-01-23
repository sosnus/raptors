import { Component, OnInit } from '@angular/core';
import {MapService} from "../../../services/map.service";
import {CorridorService} from "../../../services/corridor.service";
import {Marker} from "leaflet/src/layer/marker/Marker";
import * as L from 'leaflet';
import {UniversalPoint} from "../../../model/MapAreas/UniversalPoint";
import {AreaType} from "../../../model/type/AreaType";
import {Polygon} from "../../../model/MapAreas/Polygons/Polygon";
import {Corridor} from "../../../model/MapAreas/Corridors/Corridor";
import {StoreService} from "../../../services/store.service";

@Component({
  selector: 'app-corridors',
  templateUrl: './corridors.component.html',
  styleUrls: ['./corridors.component.css']
})
export class CorridorsComponent implements OnInit {

  dataLoaded = false;
  // private drawCorridor = false;
  private imageResolution;
  private map;
  private mapResolution = 0.01;//TODO()
  private imageURL = '';
  // private editEdges = false;
  // private corridorPoints = [];
  // private convertedPoints = [];
  // private corridorsList = [[]];
  // private vertices: Marker[] = [];
  // private selectedVert = null;
  // selectedElement = null;
  // private edges = [];
  // private readonly context;

  constructor(private mapService: MapService, private corridorService: CorridorService, private store: StoreService) {
  }

  ngOnInit() {
    this.loadMap();
  }

  // drawCorridorMethod(){
  //   this.map.on('click', e => {
  //     // dodaj wierzcholki do listy
  //     if(!this.drawCorridor) {
  //       console.log("Markec created")
  //       const markerIcon = L.icon({
  //         iconUrl: '/assets/icons/position.png',
  //         iconSize: [36, 36],
  //         iconAnchor: [36 / 2, 36 / 2]
  //       });
  //       let marker = new L.marker(e.latlng, {
  //         draggable: true,
  //         icon: markerIcon,
  //         contextmenu: true,
  //         contextmenuItems: [
  //           {
  //             text: 'Usuń punkt trasy',
  //             context: this
  //           }
  //         ]
  //       });
  //
  //       this.corridorPoints.push(e.latlng);
  //       marker.addTo(this.map);
  //     }
  //   });
  // }

  cancelCorridor() {
  }

  saveCorridor() {
    // // konwersja latlng na punkty z mapy
    // let corridorPointz: UniversalPoint[] = [];
    // this.corridorPoints.forEach(corridorP => {
    //   let coords: L.latLng = new L.latLng([
    //     this.getRealCoordinates(corridorP.lat),
    //     this.getRealCoordinates(corridorP.lng)]);
    //   this.convertedPoints.push(coords)
    // });
    //
    // // tworzenie obiektu corridor, przygotowanie do wysłania na bazę
    // this.convertedPoints.forEach(corridorP => {
    //   let universalPoint: UniversalPoint = new UniversalPoint(
    //     corridor.lat,
    //     corridor.lng,
    //     0
    //   );
    //   corridorPointz.push(universalPoint)
    // });
    // let type: AreaType = new AreaType('Polgon');
    // let corridor = new Corridor('corrido',null, corridorPointz);
    // console.log(corridor);
    // this.corridorService.save(corridor).subscribe(result => console.log(result));
  }

  createCorridor() {
    // if(this.corridorPoints.length<=3){
    //   alert("Zbyt mała liczba wierzchołków: " + this.corridorPoints.length);
    // }
    // else{
    //   var polygon = L.polygon(this.corridorPoints, {color: 'red'}).addTo(this.map);
    //   this.map.fitBounds(polygon.getBounds());
    //   //dodanie polygonu na listę przed wyczyszczeniem
    //   this.corridorsList.push(this.corridorPoints);
    // }
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

  private updateEdge(e) {
    // let markerPos = this.vertices.filter(marker => marker._leaflet_id === e.target._leaflet_id)[0];
    // let newEdges = [];
    // this.edges.forEach(edge => {
    //   if (edge.markerIDs[0] === e.target._leaflet_id) {
    //     edge.setLatLngs([markerPos._latlng, edge._latlngs[1]]);
    //     edge.redraw()
    //   }
    //   if (edge.markerIDs[1] === e.target._leaflet_id) {
    //     edge.setLatLngs([edge._latlngs[0], markerPos._latlng]);
    //     edge.redraw()
    //   }
    //   newEdges.push(edge);
    // });
    // this.edges = newEdges;
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

  private addContextMenuShowHandler() {
    // this.map.on('contextmenu.show', (event) => {
    //   if (event.relatedTarget !== null && event.relatedTarget !== undefined) {
    //     this.selectedElement = event.relatedTarget;
    //   }
    // });
  }

  private deleteMarker(e) {
    // this.vertices = this.vertices.filter(marker => marker !== e.relatedTarget);
    // this.map.removeLayer(e.relatedTarget);
    // //Remove related edges
    // let tempEdges = this.edges;
    // this.edges.forEach(edge => {
    //   if (e.relatedTarget.getLatLng() === edge._latlngs[0] || e.relatedTarget.getLatLng() === edge._latlngs[1]) {
    //     tempEdges = tempEdges.filter(tempEdge => tempEdge !== edge);
    //     this.map.removeLayer(edge);
    //   }
    // });
    // this.edges = tempEdges;
  }

  private getRealCoordinates(value) {
    return (value * this.mapResolution * (this.imageResolution / 800) - ((this.imageResolution * this.mapResolution) / 2))
  }

  private initMap(): void {
    const imageBounds = [[0, 0], [800, 800]];
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      contextmenu: true,
    });
    L.imageOverlay(this.imageURL, imageBounds).addTo(this.map);
    L.easyButton( 'fa-crosshairs', function(btn, map){
      map.setView([400,400],0);
    }).addTo(this.map);
    this.map.fitBounds(imageBounds);

    // this.addContextMenuShowHandler();
    // this.map.on('click', e => {
    //   if (!this.editEdges) {
    //     const markerIcon = L.icon({
    //       iconUrl: '/assets/icons/position.png',
    //       iconSize: [36, 36],
    //       iconAnchor: [36 / 2, 36 / 2]
    //     });
    //     let marker = new L.marker(e.latlng, {
    //       draggable: true,
    //       icon: markerIcon,
    //       contextmenu: true,
    //       contextmenuItems: [
    //         {
    //           text: 'Usuń punkt trasy',
    //           callback: this.deleteMarker,
    //           context: this
    //         }
    //       ]
    //     });
    //
    //     marker.on('click', e => {
    //       this.createEdge(e)
    //     });
    //     marker.on('move', e => {
    //       this.updateEdge(e)
    //     });
    //
    //     marker.addTo(this.map);
    //     this.vertices.push(marker)
    //   }
    // });
  }

  // private createEdge(marker) {
  //   if (this.editEdges) {
  //     if (this.selectedVert != null
  //       && this.selectedVert._leaflet_id !== marker.sourceTarget._leaflet_id) {
  //       const polyLine = new L.polyline([this.selectedVert._latlng, marker.sourceTarget._latlng], {
  //         color: 'red',
  //         weight: 7,
  //         opacity: 0.8,
  //         smoothFactor: 1,
  //         contextmenu: true
  //       });
  //       polyLine.addTo(this.map);
  //       polyLine.markerIDs = [this.selectedVert._leaflet_id, marker.sourceTarget._leaflet_id]
  //       polyLine.biDirected = false;
  //       this.edges.push(polyLine);
  //       this.selectedVert = null;
  //     } else {
  //       this.selectedVert = marker.sourceTarget;
  //     }
  //   }
  // }
}
