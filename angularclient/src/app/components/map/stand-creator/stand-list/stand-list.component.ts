import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {Marker} from 'leaflet/src/layer/marker/Marker.js';
import {StoreService} from "../../../../services/store.service";
import * as L from 'leaflet';
import {mark} from "@angular/compiler-cli/src/ngtsc/perf/src/clock";
import {GraphService} from "../../../../services/graph.service";
import {Graph} from "../../../../model/Graphs/Graph";
import {ToastrService} from "ngx-toastr";
import {Stand} from "../../../../model/Stand/Stand";
import {StandService} from "../../../../services/stand.service";

@Component({
  selector: 'app-stand-list',
  templateUrl: './stand-list.component.html',
  styleUrls: ['./stand-list.component.css']
})
export class StandListComponent implements OnInit, OnChanges {

  stands: Stand[];

  modalID = "standListModal";
  selectedStand;

  @Input()
  stand;

  @Output()
  standToEdit: EventEmitter<Stand> = new EventEmitter<Stand>();

  constructor(private store: StoreService,
              private standService: StandService,
              private toast: ToastrService) {
  }

  ngOnInit() {
    this.standService.getAll().subscribe(
      stands => this.stands = stands,
      error => this.toast.error("Błąd podczas pobierania danych: " + error.message)
    )
  }

  ngOnChanges(changes: { stand: SimpleChange }) {
    // Extract changes to the input property by its name
    if (changes.stand.currentValue)
      this.standService.getAll().subscribe(
        stands => this.stands = stands,
        error => this.toast.error("Błąd podczas pobierania danych: " + error.message)
      )
  }

  editGraph(stand: Stand) {
    this.standToEdit.emit(stand);
  }

  deleteStand(stand: Stand) {
    this.standService.delete(stand.id).subscribe(
      result => {
        this.toast.success('Usunięto stanowisko');
        this.stands = this.stands.filter(next => next != stand);
        this.standToEdit.emit(null);
      },
      error => this.toast.error('Błąd podczas łączenia z bazą: ' + error.message)
    );

  }
}
