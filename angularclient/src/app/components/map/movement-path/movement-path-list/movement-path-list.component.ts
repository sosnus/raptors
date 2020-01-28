import {Component, EventEmitter, Input, OnInit, Output, SimpleChange} from '@angular/core';
import {StoreService} from "../../../../services/store.service";
import {ToastrService} from "ngx-toastr";
import {MovementPath} from "../../../../model/MapAreas/MovementPaths/MovementPath";
import {MovementPathService} from "../../../../services/movementPath.service";

@Component({
  selector: 'app-movement-path-list',
  templateUrl: './movement-path-list.component.html',
  styleUrls: ['./movement-path-list.component.css']
})
export class MovementPathListComponent implements OnInit {

  paths: MovementPath[];

  modalID = "pathListModal";
  selectedPath;

  @Input()
  path;

  @Output()
  pathToEdit: EventEmitter<MovementPath> = new EventEmitter<MovementPath>();

  constructor(private store: StoreService,
              private movementPathService: MovementPathService,
              private toast: ToastrService) {
  }

  ngOnInit() {
    this.getPathsFromDb();
  }

  getPathsFromDb() {
    this.movementPathService.getMovementPaths().subscribe(
      paths => this.paths = paths,
      error => this.toast.error("Błąd podczas pobierania danych: " + error)
    )
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    this.movementPathService.getMovementPaths().subscribe(
      paths => this.paths = paths,
      error => this.toast.error("Błąd podczas pobierania danych: " + error)
    )
  }

  editPath(path: MovementPath) {
    this.pathToEdit.emit(path);
  }

  deletePath(path: MovementPath) {
    this.movementPathService.deleteByID(path.id).subscribe(
      result => {
        this.paths = this.paths.filter(next => next != path);
        this.pathToEdit.emit(null);
        this.toast.success('Usunięto ścieżkę ')
      },
      error => this.toast.error('Błąd podczas łączenia z bazą: ' + error)
    );
  }
}
