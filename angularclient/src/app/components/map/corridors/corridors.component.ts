import {Component, OnInit} from '@angular/core';
import {MapService} from "../../../services/map.service";
import {CorridorService} from "../../../services/corridor.service";
import {Marker} from "leaflet/src/layer/marker/Marker";
import * as L from 'leaflet';
import {UniversalPoint} from "../../../model/MapAreas/UniversalPoint";
import {Corridor} from "../../../model/MapAreas/Corridors/Corridor";
import {StoreService} from "../../../services/store.service";
import {MovementPath} from "../../../model/MapAreas/MovementPaths/MovementPath";
import {ToastrService} from "ngx-toastr";
import {MovementPathService} from "../../../services/movementPath.service";
import {Graph} from "../../../model/Graphs/Graph";

@Component({
  selector: 'app-corridors',
  templateUrl: './corridors.component.html',
  styleUrls: ['./corridors.component.css']
})
export class CorridorsComponent implements OnInit {

  dataLoaded = false;
  private drawCorridorBoolean = false;
  private imageResolution;
  private map;
  private mapResolution = 0.01;//TODO()
  private imageURL = '';
  private mapID = '5de6d25552cace719bf775cf';//TODO()
  private polygonPoints = [];
  private vertices: Marker[] = [];
  private polygon = L.polygon;
  private corridor: Corridor;
  private polygonsList = [[]];
  paths: MovementPath[] = [];
  private corridorID;

  constructor(private mapService: MapService,
              private corridorService: CorridorService,
              private store: StoreService,
              private toast: ToastrService,
              private movementPathService: MovementPathService) {
  }

  getPathsFromDb() {
    this.movementPathService.getMovementPaths().subscribe(
      data => this.paths = data
    )
  }

  ngOnInit() {
    this.loadMap();
    this.getPathsFromDb();
  }

  drawCorridor() {
    this.map.on('click', e => {
      if (!this.drawCorridorBoolean) {
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

        marker.on('move', e => {
          this.updateCorridor(e)
        });
      }
    });
  }

  cancelCorridor() {
    this.polygonPoints = [];
    this.map.removeLayer(this.polygon);
    this.polygon = L.polygon;
    this.vertices.forEach(e => {
      this.map.removeLayer(e);
    })
    this.vertices = [];
    this.corridor = null;
  }

  saveCorridor() {
    let universalPoints: UniversalPoint[] = [];
    this.polygonPoints.forEach(corridorP => {
      let coords: L.latLng = new L.latLng([
        this.getRealCoordinates(corridorP.lat),
        this.getRealCoordinates(corridorP.lng)]);
      let universalPoint: UniversalPoint = new UniversalPoint(
        coords.lat,
        coords.lng,
        0
      );
      universalPoints.push(universalPoint)
    });

    this.corridor = new Corridor("corridor", null, universalPoints);
    this.corridorService.save(this.corridor).subscribe(result => {
      if (result.id != null) {
        this.toast.success('Korytarz zapisany w bazie')
      } else {
        this.toast.error('Nie udało się zapisać do bazy')
      }
    });
    this.cancelCorridor();
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

  private deleteMarker(e) {
    if (this.polygonPoints.length != 0) {
      if (this.polygonPoints.length <= 3) {
        alert("Nie może być mniej niż trzy wierzchołki!");
      } else {
        this.vertices = this.vertices.filter(marker => marker !== e.relatedTarget);
        console.log("tu1")
        this.map.removeLayer(e.relatedTarget);
        this.map.removeLayer(this.polygon);
        this.polygonPoints = [];
        this.createCorridor();
      }
    } else {
      console.log("tu2")
      this.vertices = this.vertices.filter(marker => marker !== e.relatedTarget);
      this.map.removeLayer(e.relatedTarget);
    }
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
    L.easyButton('fa-crosshairs', function (btn, map) {
      map.setView([400, 400], 0);
    }).addTo(this.map);
    this.map.fitBounds(imageBounds);

    this.drawCorridor();
  }

  private updateCorridor(e) {
    let markerPos = this.vertices.filter(marker => marker._leaflet_id === e.target._leaflet_id)[0];
    let newEdges = [];
    newEdges = this.vertices;
    newEdges.forEach(vertice => {
      if (vertice._leaflet_id === markerPos._leaflet_id) {
        vertice._latlng = markerPos._latlng;
      }
    });
    this.polygonPoints = [];
    this.vertices = [];
    this.vertices = newEdges;
    this.createCorridor();
  }

  private createCorridor() {
    this.polygonPoints = [];
    this.vertices.forEach(marker => {
      this.polygonPoints.push(marker._latlng);
    });
    if (this.polygonPoints.length < 3) {
      alert("Zbyt mała liczba wierzchołków: " + this.polygonPoints.length);
    } else {
      this.map.removeLayer(this.polygon);
      this.polygonsList.push(this.polygonPoints);
      this.polygon = L.polygon(this.polygonPoints, {color: 'red'}).addTo(this.map);
      this.map.fitBounds(this.polygon.getBounds());
    }
  }

  clearMap() {
    this.cancelCorridor();
    this.corridorID = null;
  }

  editExistingCorridor(corridor: Corridor) {
    this.clearMap();
    // if (!graph) return;
    // this.graphID = graph.id;
    // let existingWaypoints = [];
    // let marker1;
    // let marker2;
    // let markers = [];
    // graph.edges.forEach(edge => {
    //   let marker1Temp = marker1;
    //   let marker2Temp = marker2;
    //   const vertPosA = L.latLng([this.getMapCoordinates(edge.vertexA.posY), this.getMapCoordinates(edge.vertexA.posX)]);
    //   const vertPosB = L.latLng([this.getMapCoordinates(edge.vertexB.posY), this.getMapCoordinates(edge.vertexB.posX)]);
    //
    //   if (!existingWaypoints.includes(vertPosA + '')) {//toString in order to not mind about reference
    //     marker1 = this.createNewMarker(vertPosA);
    //     markers.push(marker1);
    //     existingWaypoints.push(vertPosA + '');
    //     console.log('NewA')
    //   }
    //   if (!existingWaypoints.includes(vertPosB + '')) {
    //     marker2 = this.createNewMarker(vertPosB);
    //
    //     markers.push(marker2);
    //     existingWaypoints.push(vertPosB + '');
    //     console.log('NewB')
    //   }
    // });
    // graph.edges.forEach(edge => {
    //   const vertPosA = L.latLng([this.getMapCoordinates(edge.vertexA.posY), this.getMapCoordinates(edge.vertexA.posX)]);
    //   const vertPosB = L.latLng([this.getMapCoordinates(edge.vertexB.posY), this.getMapCoordinates(edge.vertexB.posX)]);
    //   marker1 = markers.find(marker => JSON.stringify(marker._latlng) === JSON.stringify(vertPosA));
    //   marker2 = markers.find(marker => JSON.stringify(marker._latlng) === JSON.stringify(vertPosB));
    //   this.drawEditableEdge(marker1, marker2, edge.biDirected)
    // })
  }

}
