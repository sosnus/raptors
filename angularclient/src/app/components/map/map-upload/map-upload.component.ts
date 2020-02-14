import {Component, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import {InputFileComponent} from 'ngx-input-file';
import {MapService} from '../../../services/map.service';
import {Map} from '../../../model/Map';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-map-upload',
  templateUrl: './map-upload.component.html',
  styleUrls: ['./map-upload.component.css']
})
export class MapUploadComponent implements OnInit {

  mapSelected = false;
  yamlSelected = false;
  mapName: string = '';
  success = false;
  error = false;

  constructor(private mapService: MapService,
              private toastrService: ToastrService) {

  }

  ngOnInit() {
  }


  @ViewChild('mapInput', {static: false})
  private mapInputComponent: InputFileComponent;

  @ViewChild('yamlInput', {static: false})
  private yamlInput: InputFileComponent;

  submitFiles(): void {
    this.mapService.save(this.mapName, this.mapInputComponent.files[0].file, this.yamlInput.files[0].file).subscribe(
      data => {
        this.toastrService.success('Mapa dodana pomyślnie');
        this.success = true;
      },
      error => {
        this.toastrService.error('Bląd podczas dodawania mapy' + error.message)
        this.error = true
      });
  }

  checkForm() {
    return (!this.mapSelected) || (!this.yamlSelected) || (this.mapName.length < 1);
  }
}
