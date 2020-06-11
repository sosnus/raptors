import {Component, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import {InputFileComponent} from 'ngx-input-file';
import {MapService} from '../../../services/map.service';
import {BarrierService} from '../../../services/barrier.service';
import {Map} from '../../../model/Map';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-map-upload',
  templateUrl: './barrier-generator.component.html',
  styleUrls: ['./barrier-generator.component.css']
})
export class BarrierGeneratorComponent implements OnInit {

  mapSelected = false;
  yamlSelected = false;
  robotSize: string = '';
  success = false;
  error = false;

  constructor(private mapService: MapService,
    private barrierService: BarrierService,
              private toastrService: ToastrService) {
           
  }

 

  ngOnInit() {
  }


  @ViewChild('mapInput', {static: false})
  private mapInputComponent: InputFileComponent;

  @ViewChild('yamlInput', {static: false})
  private yamlInput: InputFileComponent;

  generateBarriers(): void {
    this.barrierService.getBarriers(this.robotSize).subscribe(
      data => {
        console.log(data)
        this.toastrService.success('Mapa dodana pomyślnie');
        // Run here polygon servide adding data from barrier service
        this.success = true;
      },
      error => {
        this.toastrService.error('Bląd podczas dodawania mapy' + error.message)
        this.error = true
      });
  }

  checkForm() {
    return (this.robotSize.length < 1);
  }
}
