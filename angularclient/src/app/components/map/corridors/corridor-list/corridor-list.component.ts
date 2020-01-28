import {Component, EventEmitter, Input, OnInit, Output, SimpleChange} from '@angular/core';
import {StoreService} from "../../../../services/store.service";
import {ToastrService} from "ngx-toastr";
import {Corridor} from "../../../../model/MapAreas/Corridors/Corridor";
import {CorridorService} from "../../../../services/corridor.service";

@Component({
  selector: 'app-corridor-list',
  templateUrl: './corridor-list.component.html',
  styleUrls: ['./corridor-list.component.css']
})
export class CorridorListComponent implements OnInit {

  corridors: Corridor[];

  modalID = "corridorListModal";
  selectedCorridor;

  @Input()
  corridor;

  @Output()
  corridorToEdit: EventEmitter<Corridor> = new EventEmitter<Corridor>();

  constructor(private store: StoreService,
              private corridorService: CorridorService,
              private toast: ToastrService) {
  }

  ngOnInit() {
    this.getCorridorsFromDb();
  }

  getCorridorsFromDb() {
    this.corridorService.getCorridors().subscribe(
      corridors => this.corridors = corridors,
      error => this.toast.error("Błąd podczas pobierania danych: " + error)
    )
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    // Extract changes to the input property by its name
    this.corridorService.getCorridors().subscribe(
      corridors => this.corridors = corridors,
      error => this.toast.error("Błąd podczas pobierania danych: " + error)
    )
  }

  editCorridor(corridor: Corridor) {
    this.corridorToEdit.emit(corridor);
  }

  deleteCorridor(corridor: Corridor) {
    this.corridorService.deleteByID(corridor.id).subscribe(
      result => {
        this.corridors = this.corridors.filter(next => next != corridor);
        this.corridorToEdit.emit(null);
        this.toast.success('Usunięto korytarz ')
      },
      error => this.toast.error('Błąd podczas łączenia z bazą: ' + error)
    );
  }


}
