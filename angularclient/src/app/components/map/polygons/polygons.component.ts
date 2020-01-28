import {Component, OnInit} from '@angular/core';
import {MapService} from "../../../services/map.service";
import * as L from 'leaflet';
import '../../../../../node_modules/leaflet-contextmenu/dist/leaflet.contextmenu.js'
import '../../../../lib/leaflet-easybutton/src/easy-button';
import '../../../../lib/leaflet-easybutton/src/easy-button.css';
import {Polygon} from "../../../model/MapAreas/Polygons/Polygon";
import {UniversalPoint} from "../../../model/MapAreas/UniversalPoint";
import {AreaType} from "../../../model/type/AreaType";
import {PolygonService} from "../../../services/polygon.service";
import {Marker} from "leaflet/src/layer/marker/Marker";
import {StoreService} from "../../../services/store.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-polygons',
  templateUrl: './polygons.component.html',
  styleUrls: ['./polygons.component.css']
})
export class PolygonsComponent implements OnInit {
  dataLoaded = false;
  poly = null;
  private drawPolygon = true;
  private imageResolution;
  private mapResolution = 0.01;//TODO()
  private map;
  private imageURL = '';
  private polygonPoints = [];
  private convertedPoints = [];
  private polygonsList = [[]];
  private temppolygonsList = [[]];
  private getPolygonsFromDB: Polygon[];
  private vertices: Marker[] = [];
  private tempVertices: Marker[] = [];
  private polygon = L.polygon;

  constructor(private mapService: MapService,
              private polygonService: PolygonService,
              private store: StoreService,
              private toast: ToastrService) {
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
      //
    }

    this.polygonService.getPolygons().subscribe(polygons => {
        console.log(polygons);
        this.getPolygonsFromDB = polygons;
        /*
                this.drawPolygons(this.getPolygonsFromDB);
        */
        //console.log(this.getPolygonsFromDB);
      }
    );
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

    this.drawPoly();

  }

  private drawPoly() {
    this.map.on('click', e => {
      // dodaj wierzcholki do listy
      if (this.drawPolygon) {
        console.log("Markec created")
        const markerIcon = L.icon({
          iconUrl: '/assets/icons/position.png',
          iconSize: [36, 36],
          iconAnchor: [36 / 2, 36 / 2]
        });
        let marker = new L.marker(e.latlng, {
          draggable: true,
          icon: markerIcon,
          contextmenu: true,
          contextmenuItems: [
            {
              text: 'Usuń punkt trasy',
              callback: this.deleteMarker,
              context: this
            }
          ]
        });

        //this.markerIDs.push(marker.markerIDs);
        //this.polygonPoints.push(e.latlng);
        //this.polygonPoints.push(e.latlng);
        //this.vertices.push(marker);

        marker.addTo(this.map);
        console.log(marker._leaflet_id);
        //console.log("Nierealna wartość: " + e.latlng.lat());
        this.vertices.push(marker);

        //przemieszczanie vertexów
        marker.on('move', e => {
          this.updatePoly(e)
        });
        console.log(marker._latlng);
        //this.vertices.push(marker);
      }
    });

  }

  //przemieszczanie vertexów
  private updatePoly(e) {
    let markerPos = this.vertices.filter(marker => marker._leaflet_id === e.target._leaflet_id)[0];
    let newEdges = [];
    newEdges = this.vertices;
    newEdges.forEach(vertice => {
      if (vertice._leaflet_id === markerPos._leaflet_id) {
        vertice._latlng = markerPos._latlng;
      }
      //newEdges = this.vertices;
    });
    this.polygonPoints = [];
    this.vertices = [];
    this.vertices = newEdges;
    this.createPoly();
    newEdges = [];
  }

  private createPoly() {
    this.drawPolygon = false;
    this.polygonPoints = [];
    this.vertices.forEach(marker => {
      this.polygonPoints.push(marker._latlng);
    });
    console.log("Wierzchołki: " + this.polygonPoints);
    if (this.polygonPoints.length <= 3) {
      alert("Zbyt mała liczba wierzchołków: " + this.polygonPoints.length);
    } else {
      this.map.removeLayer(this.polygon);
      this.polygonsList.push(this.polygonPoints);
      this.polygon = L.polygon(this.polygonPoints, {color: 'red'}).addTo(this.map);
      this.map.fitBounds(this.polygon.getBounds());
    }
  }

  private getRealCoordinates(value) {
    return (value * this.mapResolution * (this.imageResolution / 800) - ((this.imageResolution * this.mapResolution) / 2))
  }

  private savePoly() {
    this.drawPolygon = true;
    this.map.removeLayer(this.polygon);
    this.map.removeLayer(this.vertices);
    this.vertices.map(edge => this.map.removeLayer(edge));

    // konwersja latlng na punkty z mapy
    let polygonPointz: UniversalPoint[] = [];
    this.polygonPoints.forEach(polygonP => {
      let coords: L.latLng = new L.latLng([
        this.getRealCoordinates(polygonP.lat),
        this.getRealCoordinates(polygonP.lng)]);
      this.convertedPoints.push(coords)
    });

    // tworzenie obiektu polygon, przygotowanie do wysłania na bazę
    this.convertedPoints.forEach(polygonP => {
      let universalPoint: UniversalPoint = new UniversalPoint(
        polygonP.lat,
        polygonP.lng,
        0
      );
      polygonPointz.push(universalPoint)
    });
    let type: AreaType = new AreaType('Polgon');
    let polygon = new Polygon('polygon', type, polygonPointz);
    console.log(polygon);
    this.polygonService.save(polygon).subscribe(result => {
        this.poly = this.polygon;
        this.toast.success('Graf zapisany w bazie')
      }
    );
    this.polygonPoints = [];
    this.vertices = [];
  }

  private deleteMarker(e) {
    this.vertices = this.vertices.filter(marker => marker !== e.relatedTarget);
    this.map.removeLayer(e.relatedTarget);
  }

  private editPol(polygon: Polygon) {
    //this.clearMap();
    this.delete(polygon);
    let existingPolygonpoints = [];
    polygon.points.forEach(point => {
      const pointPosition = L.latLng([this.getMapCoordinates(point.x), this.getMapCoordinates(point.y)]);
      const markerIcon = L.icon({
        iconUrl: '/assets/icons/position.png',
        iconSize: [36, 36],
        iconAnchor: [36 / 2, 36 / 2]
      });
      let marker = new L.marker(pointPosition, {
        draggable: true,
        icon: markerIcon,
        contextmenu: true,
        contextmenuItems: [
          {
            text: 'Usuń punkt trasy',
            callback: this.deleteMarker,
            context: this
          }
        ]
      });
      this.vertices.push(marker);
      marker.addTo(this.map);
      existingPolygonpoints.push(pointPosition);
      marker.on('move', e => {
        this.updatePoly(e)
      });
    });

    /*let polygonik = L.polygon(existingPolygonpoints, {color: 'red'}).on('click', this.onPolyClick);
    polygonik.addTo(this.map);*/
    //this.createPoly();

    console.log("vertices: " + this.vertices);
    //polygonik.addTo(this.polygons);
  }

  getMapCoordinates(value) {
    return ((value) + (this.imageResolution * this.mapResolution) / 2) * (1 / this.mapResolution) * (800 / this.imageResolution)
  }

  delete(polygon: Polygon) {
    this.polygonService.delete(polygon).subscribe(
      result => {
        this.getPolygonsFromDB = this.getPolygonsFromDB.filter(item => item !== polygon)
        //this.polygon = new Polygon();
      },
      error => {
        /*
                this.toastr.error("Wystąpił błąd podczas usuwania");
        */
      }
    )
  }

  resetPoly(){
    this.drawPolygon = true;
    this.map.removeLayer(this.polygon);
    this.map.removeLayer(this.vertices);
    this.vertices.map(edge => this.map.removeLayer(edge));
    this.vertices = new Array<Marker>();
    this.polygon = new Polygon(null, null, null);
    //this.polygonPoints = [];
    //this.polygonsList = this.temppolygonsList;
  }
}
