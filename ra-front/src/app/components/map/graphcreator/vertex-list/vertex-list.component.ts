import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Marker} from 'leaflet/src/layer/marker/Marker.js';
import {StoreService} from "../../../../services/store.service";
import * as L from 'leaflet';
import {mark} from "@angular/compiler-cli/src/ngtsc/perf/src/clock";

@Component({
  selector: 'app-vertex-list',
  templateUrl: './vertex-list.component.html',
  styleUrls: ['./vertex-list.component.css']
})
export class VertexListComponent implements OnInit, OnChanges {

  @Input() markers: Marker[];
  @Output() markersEmitter = new EventEmitter<Marker[]>();
  @Output() deleteMarkerEmitter = new EventEmitter<any>();

  constructor(private store: StoreService) {
  }

  ngOnInit() {
  }

  updateMarker(id) {
    const x = Number(document.getElementById(id + "x").innerText);
    const y = Number(document.getElementById(id + "y").innerText);
    this.markers[id].setLatLng([this.getMapCoordinates(y), this.getMapCoordinates(x)]);
    this.markersEmitter.emit(this.markers);
  }

  deleteMarker(marker: Marker) {
    let e: any = {relatedTarget: null};
    e.relatedTarget = marker;
    this.deleteMarkerEmitter.emit(e);
  }


  getMarkerPos(marker: Marker) {
    return {
      x: this.getRealCoordinates(marker.getLatLng().lng),
      y: this.getRealCoordinates(marker.getLatLng().lat)
    }
  }

  getRealCoordinates(value: number) {
    return (value * this.store.mapResolution * (this.store.imageResolution / 800) - ((this.store.imageResolution * this.store.mapResolution) / 2))
  }

  getMapCoordinates(value) {
    return ((value) + (this.store.imageResolution * this.store.mapResolution) / 2) * (1 / this.store.mapResolution) * (800 / this.store.imageResolution)
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
