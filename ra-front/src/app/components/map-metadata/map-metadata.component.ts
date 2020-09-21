import { Component, OnInit } from '@angular/core';
import { MapsService } from '../../services/maps.service';
import { ToastrService } from 'ngx-toastr';
import { Maps } from "../../model/mapsMetadata/Maps";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-map-metadata',
  templateUrl: './map-metadata.component.html',
  styleUrls: ['./map-metadata.component.css']
})
export class MapMetadataComponent implements OnInit {

  mapsArray: Maps[];
  modalID = 'mapsTypeModal';
  newMap = new Maps();

  constructor(
    private mapsService: MapsService,
    private toastr: ToastrService,
    public authService: AuthService) {
  }

  ngOnInit() {
    this.mapsService.getAll().subscribe(data => {
        this.mapsArray = data;
      },
      error => {
        console.log(error);
      }
    );
  }


  deleteMap() {
    //usuwa mapę oraz wysyła delete-request aby usunąc ją z bazy oraz minio
    //nalezy po implementacji usunąć komponent mapupload???
  }

  addNewMap(maps: Maps) {
    Object.assign(this.newMap, maps);
  }

  reset() {
    console.log('reset');
  }

  updateMaps() {
    this.mapsService.updateMaps(this.newMap).subscribe(
      result => {
        this.toastr.success('Edytowano pomyślnie');
      },
      error => {
        console.log(error);
        this.toastr.error('Wystąpił bład podczas dodawania lub edycji');
      }
    );
  }
}
