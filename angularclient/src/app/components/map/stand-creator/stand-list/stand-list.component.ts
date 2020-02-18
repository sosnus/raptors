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
import {MovementPathService} from "../../../../services/movementPath.service";
import {MovementPath} from "../../../../model/MapAreas/MovementPaths/MovementPath";

@Component({
  selector: 'app-stand-list',
  templateUrl: './stand-list.component.html',
  styleUrls: ['./stand-list.component.css']
})
export class StandListComponent implements OnInit, OnChanges {

  stands: Stand[];
  paths:MovementPath[];

  modalID = "standListModal";
  selectedStand;
  relatedPathsToSelectedStandMessage;

  @Input()
  stand;

  @Output()
  standToEdit: EventEmitter<Stand> = new EventEmitter<Stand>();

  constructor(private store: StoreService,
              private standService: StandService,
              private toast: ToastrService,
              private pathService: MovementPathService) {
  }

  ngOnInit() {
    this.standService.getAll().subscribe(
      stands => this.stands = stands,
      error => this.toast.error("Błąd podczas pobierania danych: " + error.message)
    )
    this.pathService.getMovementPaths().subscribe(
      paths => this.paths = paths,
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

  validateStand(stand:Stand){
    this.selectedStand=stand;

    const standId=stand.id;
    var counter=0;
    this.paths.forEach(e=>{
      if(e.startStandId==standId || e.finishStandId==standId){
        counter=counter+1;
      }
    });
    if(counter>0){
      this.relatedPathsToSelectedStandMessage=" Usunięcie tego stanowiska wiąże się z usunięciem go jako punktu POI z "+counter+" ścieżek! " +
        "Będziesz mógł dopisać nowe stanowiska do ścieżek, ale mogą one działać niepoprawnie.";
    }
    else{
      this.relatedPathsToSelectedStandMessage=""
    }
  }

}
