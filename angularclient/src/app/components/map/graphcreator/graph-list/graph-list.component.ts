import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {Marker} from 'leaflet/src/layer/marker/Marker.js';
import {StoreService} from "../../../../services/store.service";
import * as L from 'leaflet';
import {mark} from "@angular/compiler-cli/src/ngtsc/perf/src/clock";
import {GraphService} from "../../../../services/graph.service";
import {Graph} from "../../../../model/Graphs/Graph";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-graph-list',
  templateUrl: './graph-list.component.html',
  styleUrls: ['./graph-list.component.css']
})
export class GraphListComponent implements OnInit, OnChanges {

  graphs: Graph[];

  modalID = "graphListModal";
  selectedGraph;

  @Input()
  graph;

  @Output()
  graphToEdit: EventEmitter<Graph> = new EventEmitter<Graph>();

  constructor(private store: StoreService,
              private graphService: GraphService,
              private toast: ToastrService) {
  }

  ngOnInit() {
    this.graphService.getAll().subscribe(
      graphs => this.graphs = graphs,
      error => this.toast.error("Błąd podczas pobierania danych: " + error)
    )
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    // Extract changes to the input property by its name
    this.graphService.getAll().subscribe(
      graphs => this.graphs = graphs,
      error => this.toast.error("Błąd podczas pobierania danych: " + error)
    )
  }

  editGraph(graph: Graph) {
    this.graphToEdit.emit(graph);
  }

  deleteGraph(graph: Graph) {
    this.graphs = this.graphs.filter(next => next != graph);
    // this.graphService.delete(graph).subscribe(
    //   result => result,
    //   error => this.toast.error('Błąd podczas łączenia z bazą: ' + error)
    // );
    this.graphService.deleteByID(graph.id).subscribe(
      result => this.toast.success('Usunięto graf '),
      error => this.toast.error('Błąd podczas łączenia z bazą: ' + error)
    );
    this.graphToEdit.emit(null);
  }


}
