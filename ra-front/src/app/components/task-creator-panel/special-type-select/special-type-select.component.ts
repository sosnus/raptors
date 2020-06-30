import { Component, OnInit, Input } from '@angular/core';
import { StandService } from 'src/app/services/stand.service';
import { CorridorService } from 'src/app/services/corridor.service';
import { ElementFunctionalityService } from 'src/app/services/type/element-functionality.service';
import { RobotService } from 'src/app/services/robot.service';
import { RobotModelService } from 'src/app/services/type/robot-model.service';
import { StandTypeService } from 'src/app/services/type/stand-type.service';
import { ParkingTypeService } from 'src/app/services/type/parking-type.service';

@Component({
  selector: 'app-special-type-select',
  templateUrl: './special-type-select.component.html',
  styleUrls: ['./special-type-select.component.css']
})
export class SpecialTypeSelectComponent implements OnInit {
  @Input() typeName = "";
  @Input() displayName = "";
  specialTypes: any[] = [];

  constructor(
    private corridorService: CorridorService,
    private elementFuncService: ElementFunctionalityService, 
    private parkingTypeService: ParkingTypeService,
    private standService: StandService,
    private robotService: RobotService,
    private robotModelService: RobotModelService,
    private standTypeService: StandTypeService ) { }

  ngOnInit() {
    
    if (this.typeName === 'corridor') {
      this.corridorService.getCorridors().subscribe(res => {
        this.specialTypes = res;
      });
    }

    // EdgeService doesn't exist
    if (this.typeName === 'edge') {
      this.specialTypes = [{"id": 1, "name": "name"}]
    }

    if (this.typeName === 'elementFunc') {
      this.elementFuncService.getAll().subscribe(res => {
        this.specialTypes = res;
      });
    }

    if (this.typeName === 'parkingType') {
      this.parkingTypeService.getAll().subscribe(res => {
        this.specialTypes = res;
      });
    }

    if (this.typeName === 'robot') {
      this.robotService.getAll().subscribe(res => {
        this.specialTypes = res;
      });
    }

    if (this.typeName === 'robotModel') {
      this.robotModelService.getAll().subscribe(res => {
        this.specialTypes = res;
      });
    }

    // RouteService doesn't exist
    if (this.typeName === 'route') {
      this.specialTypes = [{"id": 1, "name": "name"}]
    }

    if (this.typeName === 'stand') {
      this.standService.getAll().subscribe(res => {
        this.specialTypes = res;
      });
    }

    if (this.typeName === 'standType') {
      this.standTypeService.getAll().subscribe(res => {
        this.specialTypes = res;
      });
    }


  }

}
