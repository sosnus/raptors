import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { InputFileComponent } from 'ngx-input-file';
import { MapService } from '../../../services/map.service';
import { Map } from '../../../model/Map';

@Component({
  selector: 'app-map-upload',
  templateUrl: './map-upload.component.html',
  styleUrls: ['./map-upload.component.css']
})
export class MapUploadComponent implements OnInit {

  mapSelected = false;
  yamlSelected = false;
  mapName: string="";

  constructor(private mapService: MapService) {

  }

  ngOnInit() {
  }


  @ViewChild('mapInput', {static: false})
  private mapInputComponent: InputFileComponent;

  @ViewChild('yamlInput', {static: false})
  private yamlInput: InputFileComponent;

  submitFiles() {
    console.log(this.mapName)
    const outerContext = this;
    const mapReader = new FileReader();
    mapReader.readAsDataURL(this.mapInputComponent.files[0].file);
    mapReader.onload = function () {
      console.log(mapReader.result);
      const yamlReader = new FileReader();
      yamlReader.readAsDataURL(outerContext.yamlInput.files[0].file);
      yamlReader.onload = function () {
        const map = new Map(
          outerContext.mapName,
          mapReader.result,
          yamlReader.result
        );
        outerContext.mapService.save(map).subscribe();
      };
    };
  }
}
