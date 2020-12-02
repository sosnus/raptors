import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from '../../../services/map.service';
import { SettingsService } from '../../../services/settings.service';
import * as L from 'leaflet';
import {Marker} from 'leaflet/src/layer/marker/Marker.js';
import '../../../../../node_modules/leaflet-contextmenu/dist/leaflet.contextmenu.js';
import 'leaflet-arrowheads';
import '../../../../lib/leaflet-easybutton/src/easy-button';
import '../../../../lib/leaflet-easybutton/src/easy-button.css';
import {Graph} from '../../../model/Graphs/Graph';
import {Edge} from '../../../model/Graphs/Edge';
import {Vertex} from '../../../model/Graphs/Vertex';
import {GraphService} from "../../../services/graph.service";
import {StoreService} from "../../../services/store.service";
import { StandService } from '../../../services/stand.service';
import { Stand } from '../../../model/Stand/Stand';
import {WAYPOINTICON} from "../map.component";
import {WAYPOINTICON_WAITING} from "../map.component";
import {WAYPOINTICON_WAITING_DEPARTURE} from "../map.component";
import {WAYPOINTICON_DEPARTURE} from "../map.component";
import {WAYPOINTICON_INTERSECTION} from "../map.component";
import {WAYPOINTICON_DUMMY} from "../map.component";
import {STANDICON} from "../map.component";
import {ToastrService} from "ngx-toastr";
import {fromEvent} from "rxjs";


@Component({
  selector: 'app-graphcreator',
  templateUrl: './graphcreator.component.html',
  styleUrls: ['./graphcreator.component.css']
})
export class GraphcreatorComponent implements OnInit, OnDestroy {

  dataLoaded = false;
  graph = null;
  private editEdges = false;
  private graphID;

  private vertices: Marker[] = [];
  private vertices_hidden: Marker[] = [];
  private poiStandsMarkers = [];
  private selectedVert = null;
  selectedElement = null;
  private edges = [];
  private readonly context;

  //Map related variables
  private map;
  private imageURL = '';
  private mapId;
  private mapResolution;
  private mapOriginX;
  private mapOriginY;
  private imageResolution;
  private mapContainerSize = 800;
  private subscription;

  constructor(private mapService: MapService,
              private settingsService: SettingsService,
              private graphService: GraphService,
              private standService: StandService,
              private store: StoreService,
              private toast: ToastrService) {
    this.context = this;
  }

  ngOnInit() {
    this.loadMap();
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
    this.settingsService.getCurrentMap().subscribe(
      mapData => {
        this.mapId = mapData.currentMapId;
        this.mapResolution = mapData.mapResolutionX;
        this.mapOriginX = mapData.mapOriginX;
        this.mapOriginY = mapData.mapOriginY;
        this.mapService.getMap(this.mapId).subscribe(
          data => {
            this.afterMapLoaded(data);
            localStorage.setItem(this.store.mapID, data)
          }
        );
      }
    );
  }

  private afterMapLoaded(data: String) {
    this.dataLoaded = true;
    this.imageURL = 'data:image/jpg;base64,' + data;
    this.initMap();

    const img = new Image;
    img.src = this.imageURL;
    img.onload = () => {
      this.imageResolution = img.width;
      this.standService.getAll().subscribe(
        stands => {
          stands.forEach(stand => {
            const position = L.latLng([
              this.getMapCoordinates(Number(stand.pose.position.y), this.mapOriginY),
              this.getMapCoordinates(Number(stand.pose.position.x), this.mapOriginX)
            ]);
            this.createNewPOIMarker(position, stand);
          });
          this.addPOItomap();
        }
      );
    }
  }

  private initMap(): void {
    const imageBounds = [[0, 0], [ this.mapContainerSize,  this.mapContainerSize]];
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      contextmenu: true,
    });
    L.imageOverlay(this.imageURL, imageBounds).addTo(this.map);
    L.easyButton('fa-crosshairs', function (btn, map) {
      map.setView([400, 400], 0);
    }).addTo(this.map);
    this.map.fitBounds(imageBounds);

    this.addContextMenuShowHandler();
    this.map.on('click', e => {
      if (!this.editEdges) {
        this.createNewMarker(e.latlng,"0",13);
      }
    });
  }

  private createNewMarker(position: L.latlng, poiID: string, type: number) {
    let marker = null;
    if(poiID !== "0"){ // poi marker form edge
      marker = new L.marker(position, {
        draggable: false,
        icon: WAYPOINTICON_DUMMY,
        opacity: 0.0
      });
      marker.poiID = poiID;
      marker.type = type;
      marker.dummy = 1;
      marker.addTo(this.map);
      this.vertices_hidden.push(marker);
    } else { // standard marker
      marker = new L.marker(position, {
        draggable: true,
        icon: this.setMarkerColor(type),
        contextmenu: true,
        contextmenuItems: [
          {
            text: 'Usuń punkt trasy',
            callback: this.deleteMarker,
            context: this
          },
          '-',{
            text:("Nr. węzła: "+this.vertices.length),
            disabled:true
          },{
            text:("Typ węzła:"),
            disabled:true
          },{
            text:((type == 13)?'>> ':'')+'Normal',
            callback: this.changeMarkerType(13),
            newType: 13,
            context: this
          },{
            text:((type == 14)?'>> ':'')+'Intersection',
            callback: this.changeMarkerType(14),
            newType: 14,
            context: this
          },{
            text:((type == 10)?'>> ':'')+'Waiting-Departure',
            callback: this.changeMarkerType(10),
            newType: 10,
            context: this
          },{
            text:((type == 9)?'>> ':'')+'Departure',
            callback: this.changeMarkerType(9),
            newType: 9,
            context: this
          },{
            text:((type == 8)?'>> ':'')+'Waiting',
            callback: this.changeMarkerType(8),
            newType: 8,
            context: this
          }
        ]
      });
      marker.poiID = 0;
      marker.type = type;
      marker.on('click', e => {
        this.createEdge(e)
      });
      marker.on('move', e => {
        this.updateEdge(e)
      });
      marker.addTo(this.map);
      this.vertices.push(marker);
    }
    return marker;
  }

  private changeMarkerType(nType){
    return function(e){
      console.log(e);
      let currType = e.relatedTarget.type;
      if(currType !== nType){
        e.relatedTarget.type = nType;
        e.relatedTarget.setIcon(this.setMarkerColor(nType)); 
        let oldSel = e.relatedTarget.options.contextmenuItems.filter(o=>{return o.newType === currType});
        if(oldSel.length) oldSel[0].text = oldSel[0].text.slice(3);
        let newSel = e.relatedTarget.options.contextmenuItems.filter(o=>{return o.newType === nType});
        if(newSel.length) newSel[0].text = '>> '+newSel[0].text;
      }
    }
  }

  updateMarkers() {

  }

  private updateEdge(e) {
    let markerPos = this.vertices.filter(marker => marker._leaflet_id === e.target._leaflet_id)[0];
    let newEdges = [];
    this.edges.forEach(edge => {
      if (edge.markerIDs[0] === e.target._leaflet_id) {
        edge.setLatLngs([markerPos._latlng, edge._latlngs[1]]);
        edge.redraw()
      }
      if (edge.markerIDs[1] === e.target._leaflet_id) {
        edge.setLatLngs([edge._latlngs[0], markerPos._latlng]);
        edge.redraw()
      }
      newEdges.push(edge);
    });
    this.edges = newEdges;
  }

  private addContextMenuShowHandler() {
    this.map.on('contextmenu.show', (event) => {
      if (event.relatedTarget !== null && event.relatedTarget !== undefined) {
        this.selectedElement = event.relatedTarget;
      }
    });
  }

  private createEdge(marker) {
    if (this.editEdges) {
      if (this.selectedVert != null && this.selectedVert._leaflet_id !== marker.sourceTarget._leaflet_id) {
        const polyLine = new L.polyline([this.selectedVert._latlng, marker.sourceTarget._latlng], {
          color: 'green',
          weight: 12,
          opacity: 0.8,
          smoothFactor: 1,
          contextmenu: true,
          contextmenuItems: [
            {
              text: 'Usuń krawędź grafu',
              callback: this.deleteEdge,
              context: this.context
            },
            {
              text: 'Aktywna: Tak',
              callback: this.isActiveEdge,
              context: this.context
            },
            '-',
            {
              text: 'Dwukierunkowa: Tak',
              callback: this.biDirectEdge,
              context: this.context
            },
            {
              text: 'Wąska: Nie',
              callback: this.narrowEdge,
              context: this.context,
              disabled: false
            },
            {
              text: 'Zmień zwrot',
              callback: this.reverseEdge,
              context: this.context,
              disabled: true
            }
          ]
        });
        polyLine.addTo(this.map);
        polyLine.markerIDs = [this.selectedVert._leaflet_id, marker.sourceTarget._leaflet_id];
        polyLine.biDirected = true;
        polyLine.narrow = false;
        polyLine.isActive = true;
        this.edges.push(polyLine);
        this.selectedVert = null;
      } else {
        this.selectedVert = marker.sourceTarget;
      }
    }
  }


  private deleteMarker(e) {
    this.vertices = this.vertices.filter(marker => marker !== e.relatedTarget);
    this.map.removeLayer(e.relatedTarget);
    //Remove related edges
    let tempEdges = this.edges;
    this.edges.forEach(edge => {
      if (e.relatedTarget.getLatLng() === edge._latlngs[0] || e.relatedTarget.getLatLng() === edge._latlngs[1]) {
        tempEdges = tempEdges.filter(tempEdge => tempEdge !== edge);
        this.map.removeLayer(edge);
      }
    });
    this.edges = tempEdges;
  }

  private deleteEdge() {
    this.edges = this.edges.filter(edge => edge !== this.selectedElement);
    this.map.removeLayer(this.selectedElement);
  }

  private biDirectEdge() {
    const index = this.edges.indexOf(this.selectedElement);
    
    this.selectedElement.biDirected = !this.selectedElement.biDirected;
    this.selectedElement.options.contextmenuItems[3].text = 'Dwukierunkowa: '+(this.selectedElement.biDirected ? 'Tak' : 'Nie');

    this.selectedElement.options.contextmenuItems[4].disabled = (this.selectedElement.biDirected ? false : true)
    this.selectedElement.options.contextmenuItems[5].disabled = (this.selectedElement.biDirected ? true : false)
    if(!this.selectedElement.biDirected && !this.selectedElement.narrow){
      this.selectedElement.narrow = !this.selectedElement.narrow;
      this.selectedElement.setStyle({weight: (this.selectedElement.narrow ? 6 : 12)});
      this.selectedElement.options.contextmenuItems[4].text = 'Wąska: '+(this.selectedElement.narrow ? 'Tak' : 'Nie')
    }

    if(!this.selectedElement.biDirected){
      this.selectedElement.arrowheads({yawn:30,fill:true,frequency:2,size:'25px'});
      this.selectedElement.redraw();
    } else {
      this.selectedElement.deleteArrowheads();
    }

    this.edges[index] = this.selectedElement;
  }

  private narrowEdge() {
    const index = this.edges.indexOf(this.selectedElement);

    this.selectedElement.narrow = !this.selectedElement.narrow;
    this.selectedElement.setStyle({weight: (this.selectedElement.narrow ? 6 : 12)});
    this.selectedElement.options.contextmenuItems[4].text = 'Wąska: '+(this.selectedElement.narrow ? 'Tak' : 'Nie')
    
    this.edges[index] = this.selectedElement;
  }

  private isActiveEdge() {
    const index = this.edges.indexOf(this.selectedElement);

    this.selectedElement.isActive = !this.selectedElement.isActive;
    this.selectedElement.setStyle({color: (this.selectedElement.isActive ? 'green' : 'red')});
    this.selectedElement.options.contextmenuItems[1].text = 'Aktywna: '+(this.selectedElement.isActive ? 'Tak' : 'Nie')
    this.selectedElement.redraw();

    this.edges[index] = this.selectedElement;
  }

  private reverseEdge() {
    const index = this.edges.indexOf(this.selectedElement);

    let mID = this.selectedElement.markerIDs;
    this.selectedElement.markerIDs = [mID[1],mID[0]];

    let pll = this.selectedElement._latlngs;
    this.selectedElement._latlngs = [pll[1],pll[0]];

    this.selectedElement.redraw();

    this.edges[index] = this.selectedElement;
  }

  public saveGraph(){
    let graph: Graph = new Graph();
    let graphEdges: Edge[] = [];
    let verticles_all = this.vertices.concat(this.vertices_hidden);
    this.edges.forEach(edge => {
      let marker1 = verticles_all.filter(marker => marker._leaflet_id === edge.markerIDs[0])[0];
      let vertexA: Vertex = new Vertex(
        this.getRealCoordinates(edge._latlngs[0].lng, this.mapOriginX),
        this.getRealCoordinates(edge._latlngs[0].lat, this.mapOriginY),
        marker1.poiID,
        marker1.type
      );
      let marker2 = verticles_all.filter(marker => marker._leaflet_id === edge.markerIDs[1])[0];
      let vertexB: Vertex = new Vertex(
        this.getRealCoordinates(edge._latlngs[1].lng, this.mapOriginX),
        this.getRealCoordinates(edge._latlngs[1].lat, this.mapOriginY),
        marker2.poiID,
        marker2.type
      );
      let graphEdge = new Edge(vertexA, vertexB, edge.biDirected, edge.narrow, edge.isActive);
      graphEdges.push(graphEdge)
    });
    graph.edges = graphEdges;
    if (this.graphID) graph.id = this.graphID;
    this.graphService.save(graph).subscribe(result => {
      this.graph = graph;
      this.toast.success('Graf zapisany w bazie');
    });
  }

  getRealCoordinates(value: number, origin : number) {
    return (value * this.mapResolution * (this.imageResolution /  this.mapContainerSize) + origin)
  }

  getMapCoordinates(value, origin) {
    return (value - origin) * (1 / this.mapResolution) * ( this.mapContainerSize / this.imageResolution)
  }

  clearMap(addPOI = 1){
    this.vertices.map(marker => this.map.removeLayer(marker));
    this.edges.map(edge => this.map.removeLayer(edge));
    this.vertices = [];
    this.vertices_hidden = [];
    this.edges = [];
    this.graphID = null;
    if(addPOI) this.addPOItomap();
  }

  editExistingGraph(graph: Graph) {
    this.clearMap(0);
    if (!graph) return;
    this.graphID = graph.id;
    let existingWaypoints = [];
    let marker1;
    let marker2;
    let markers = [];
    graph.edges.forEach(edge => {
      const vertPosA = L.latLng([this.getMapCoordinates(edge.vertexA.posY, this.mapOriginY), this.getMapCoordinates(edge.vertexA.posX, this.mapOriginX)]);
      const vertPosB = L.latLng([this.getMapCoordinates(edge.vertexB.posY, this.mapOriginY), this.getMapCoordinates(edge.vertexB.posX, this.mapOriginX)]);
      if (!existingWaypoints.includes(vertPosA + '')) {//toString in order to not mind about reference
        marker1 = this.createNewMarker(vertPosA, edge.vertexA.poiID, edge.vertexA.type);
        markers.push(marker1);
        existingWaypoints.push(vertPosA + '');
      }
      if (!existingWaypoints.includes(vertPosB + '')) {
        marker2 = this.createNewMarker(vertPosB, edge.vertexB.poiID, edge.vertexB.type);
        markers.push(marker2);
        existingWaypoints.push(vertPosB + '');
      }
    });
    graph.edges.forEach(edge => {
      const vertPosA = L.latLng([this.getMapCoordinates(edge.vertexA.posY, this.mapOriginY), this.getMapCoordinates(edge.vertexA.posX, this.mapOriginX)]);
      const vertPosB = L.latLng([this.getMapCoordinates(edge.vertexB.posY, this.mapOriginY), this.getMapCoordinates(edge.vertexB.posX, this.mapOriginX)]);
      marker1 = markers.find(marker => JSON.stringify(marker._latlng) === JSON.stringify(vertPosA));
      marker2 = markers.find(marker => JSON.stringify(marker._latlng) === JSON.stringify(vertPosB));
      this.drawEditableEdge(marker1, marker2, edge.biDirected, edge.narrow, edge.isActive)
    });
    this.hiddenPOImarkersFix();
    this.addPOItomap();
  }

  drawEditableEdge(marker1, marker2, biDirected: boolean, narrow: boolean, isActive: boolean) {
    const polyLine = new L.polyline([marker1._latlng, marker2._latlng], {
      color: (isActive ? 'green' : 'red'),
      weight: (narrow ? 6 : 12),
      opacity: 0.8,
      smoothFactor: 1,
      contextmenu: true,
      contextmenuItems: [
        {
          text: 'Usuń krawędź grafu',
          callback: this.deleteEdge,
          context: this.context
        },
        {
          text: 'Aktywna: '+(isActive?'Tak':'Nie'),
          callback: this.isActiveEdge,
          context: this.context
        },
        '-',
        {
          text: 'Dwukierunkowa: '+(biDirected?'Tak':'Nie'),
          callback: this.biDirectEdge,
          context: this.context
        },
        {
          text: 'Wąska: '+(narrow?'Tak':'Nie'),
          callback: this.narrowEdge,
          context: this.context,
          disabled: (biDirected?false:true)
        },
        {
          text: 'Zmień zwrot',
          callback: this.reverseEdge,
          context: this.context,
          disabled: (biDirected?true:false)
        }
      ]
    });
    if(!biDirected) polyLine.arrowheads({yawn:30,fill:true,frequency:2,size:'25px'});
    polyLine.addTo(this.map);
    polyLine.markerIDs = [marker1._leaflet_id, marker2._leaflet_id];
    polyLine.biDirected = biDirected;
    polyLine.narrow = narrow;
    polyLine.isActive = isActive;
    this.edges.push(polyLine);
  }

  private createNewPOIMarker(position: L.latlng, standData: Stand) {
    let marker = new L.marker(position, {
      draggable: false,
      icon: STANDICON,
      contextmenu: true,
      contextmenuItems: [
        { disabled: true, text: 'Nazwa POI: '+standData.name },
        { disabled: true, text: 'Typ stanowiska: '+standData.standType.name },
        { disabled: true, text: 'Typ parkowania: '+standData.parkingType.name }
      ]
    });
    marker.poiID = standData.id;
    marker.type = 0;
    marker.dummy = 0;
    marker.on('click', e => {
      this.createEdge(e)
    });
    this.poiStandsMarkers.push(marker);
  }

  addPOItomap(){
    this.poiStandsMarkers.forEach(marker => {
      marker.addTo(this.map);
      this.vertices_hidden.push(marker);
    });
  }

  hiddenPOImarkersFix(){
    let dummyPOI = this.vertices_hidden.filter(marker => marker.dummy == 1);
    dummyPOI.forEach(dummy => {
      let standPOI = this.poiStandsMarkers.filter(stand => stand.poiID === dummy.poiID);
      if(standPOI.length){
        if(standPOI[0].getLatLng() !== dummy.getLatLng()){
          dummy.setLatLng(standPOI[0].getLatLng()).update();
          let newEdges = [];
          this.edges.forEach(edge => {
            if (edge.markerIDs[0] === dummy._leaflet_id) {
              edge.setLatLngs([dummy._latlng, edge._latlngs[1]]);
              edge.redraw()
            }
            if (edge.markerIDs[1] === dummy._leaflet_id) {
              edge.setLatLngs([edge._latlngs[0], dummy._latlng]);
              edge.redraw()
            }
            newEdges.push(edge);
          });
          this.edges = newEdges;
        }
      } else{
        this.vertices_hidden = this.vertices_hidden.filter(marker => marker !== dummy);
        this.map.removeLayer(dummy);
        //Remove related edges
        let tempEdges = this.edges;
        this.edges.forEach(edge => {
          if (dummy.getLatLng() === edge._latlngs[0] || dummy.getLatLng() === edge._latlngs[1]) {
            tempEdges = tempEdges.filter(tempEdge => tempEdge !== edge);
            this.map.removeLayer(edge);
          }
        });
        this.edges = tempEdges;
      }
    });
  }

  setMarkerColor(type: number){
    switch(type){
      case 14: return WAYPOINTICON_INTERSECTION;
      case 10: return WAYPOINTICON_WAITING_DEPARTURE;
      case  9: return WAYPOINTICON_DEPARTURE;
      case  8: return WAYPOINTICON_WAITING;
      case 13:
      default: return WAYPOINTICON;
    }
  }
}
