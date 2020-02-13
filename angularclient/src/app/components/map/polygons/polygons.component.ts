import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {AreaTypeService} from "../../../services/type/area-type.service";
import {fromEvent} from "rxjs";

@Component({
  selector: 'app-polygons',
  templateUrl: './polygons.component.html',
  styleUrls: ['./polygons.component.css']
})
export class PolygonsComponent implements OnInit, OnDestroy {
  dataLoaded = false;
  poly = null;
  private drawPolygon = true;
  private polygonPoints = [];
  private convertedPoints = [];
  private polygonsList = [[]];
  private getPolygonsFromDB: Polygon[];
  private vertices: Marker[] = [];
  private polygon = L.polygon;
  private areaTypes: AreaType[] = [];
  private areaType: AreaType;
  selectedAreaType: string;

  //Map related variables
  private map;
  private imageURL = '';
  private mapResolution = 0.01;//TODO()
  private imageResolution;
  private mapContainerSize = 800;
  private subscription;

  constructor(private mapService: MapService,
              private polygonService: PolygonService,
              private storeService: StoreService,
              private areaTypeService: AreaTypeService,
              private toast: ToastrService) {
  }

  ngOnInit() {
    this.loadMap();
    this.areaType = new AreaType(null, null);
    this.subscription = fromEvent(window, 'resize').subscribe(() => this.onResize());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onResize() {
    const mapContainer = document.getElementById('map-container');
    this.mapContainerSize = mapContainer.clientWidth;
  }

  private loadMap() {
    if (localStorage.getItem(this.storeService.mapID) !== null) {
      this.afterMapLoaded(localStorage.getItem(this.storeService.mapID))
    } else {
      this.mapService.getMap(this.storeService.mapID).subscribe(
        data => {
          this.afterMapLoaded(data);
          localStorage.setItem(this.storeService.mapID, data)
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
      }
    );

    this.areaTypeService.getAll().subscribe(areaTypes => {
      this.areaTypes = areaTypes;
    })
  }

  private initMap(): void {
    const imageBounds = [[0, 0], [this.mapContainerSize, this.mapContainerSize]];
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

        marker.addTo(this.map);
        console.log(marker._leaflet_id);
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
      //this.areaType.color = 'red';
      //console.log("checking color: " + this.areaType.color);
      this.polygon = L.polygon(this.polygonPoints, {color: this.areaType.color}).addTo(this.map);
      this.map.fitBounds(this.polygon.getBounds());
    }
  }

  private getRealCoordinates(value) {
    return (value * this.mapResolution * (this.imageResolution / this.mapContainerSize) - ((this.imageResolution * this.mapResolution) / 2))
  }

  private savePoly() {
    if(this.selectedAreaType!=null){

      this.drawPolygon = true;
      this.map.removeLayer(this.polygon);
      this.map.removeLayer(this.vertices);
      this.convertedPoints = [];
      this.vertices.map(edge => this.map.removeLayer(edge));
      this.vertices = new Array<Marker>();    // konwersja latlng na punkty z mapy
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
      let type: AreaType = new AreaType(this.areaType.name, this.areaType.color);
      let polygon = new Polygon('polygon', type, polygonPointz);
      console.log(polygon);
      this.polygonService.save(polygon).subscribe(result => {
          this.poly = this.polygon;
          this.toast.success('Graf zapisany w bazie')
        }
      );
      this.polygonPoints = [];
      this.vertices = [];
      //this.resetPoly();
      console.log("vertices po zapisaniu " + this.vertices);
    }
    else this.toast.error('Podaj typ obszaru!')

  }

  private deleteMarker(e) {
    this.vertices = this.vertices.filter(marker => marker !== e.relatedTarget);
    this.map.removeLayer(e.relatedTarget);
  }

  private editPol(polygon: Polygon) {
    //this.clearMap();
    this.vertices.map(edge => this.map.removeLayer(edge));
    this.vertices = new Array<Marker>();
    this.delete(polygon);
    //this.resetPoly();

    this.areaType.color = polygon.type.color;
    this.areaType.name = polygon.type.name;
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
    this.createPoly();
   // console.log(polygon.type.color);
   // this.polygon = L.polygon(existingPolygonpoints, {color: polygon.type.color}).addTo(this.map);
   // console.log("vertices: " + this.vertices);
  }

  getMapCoordinates(value) {
    return ((value) + (this.imageResolution * this.mapResolution) / 2) * (1 / this.mapResolution) * (this.mapContainerSize / this.imageResolution)
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

  resetPoly() {
    this.drawPolygon = true;
    this.map.removeLayer(this.polygon);
    this.map.removeLayer(this.vertices);
    this.vertices.map(edge => this.map.removeLayer(edge));
    this.vertices = new Array<Marker>();
    this.polygon = new Polygon(null, null, null);

  }

  selectAreaTypeID(id: string) {
    this.selectedAreaType = id;
    console.log('Kliknięty typ obszaru ma id: : ' + this.selectedAreaType);
    this.areaTypes.forEach(areaType => {
      if (areaType.id === this.selectedAreaType) {
        console.log("kolor: areatype: " + areaType.color);
        this.areaType.color = areaType.color;
        this.areaType.name = areaType.name;

        this.polygon.setStyle({
          color: this.areaType.color
        });
      }
    });
  }
}
