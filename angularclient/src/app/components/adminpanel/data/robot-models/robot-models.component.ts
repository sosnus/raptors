import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {RobotModel} from "../../../../model/Robots/RobotModel";
import {RobotModelService} from "../../../../services/type/robot-model.service";
import {PropulsionType} from "../../../../model/type/PropulsionType";
import {BatteryType} from "../../../../model/type/BatteryType";
import {BatteryTypeService} from "../../../../services/type/battery-type.service";
import {PropulsionTypeService} from "../../../../services/type/propulsion-type.service";

@Component({
  selector: 'app-robot-models',
  templateUrl: './robot-models.component.html',
  styleUrls: ['./robot-models.component.css']
})
export class RobotModelsComponent implements OnInit {
  robotModels: RobotModel[] = [];
  propulsionTypes: PropulsionType[] = [];
  batteryTypes: BatteryType[] = [];
  robotModel: RobotModel = new RobotModel(null,null,null,null,null,null,null,null,null);
  modalID = "robotModelModal";

  constructor(private robotModelService: RobotModelService, private toastr: ToastrService, private batteryTypeService:BatteryTypeService,
              private propulsionTypeService:PropulsionTypeService) { }

  ngOnInit() {
    this.getRobotModels();
    this.getBatteryTypes();
    this.getPropulsionTypes();
  }

  getPropulsionTypes(){
    this.propulsionTypeService.getAll().subscribe(
      data => this.propulsionTypes = data
    )
  }

  getBatteryTypes(){
    this.batteryTypeService.getAll().subscribe(
      data => this.batteryTypes = data
    )
  }

  getRobotModels() {
    this.robotModelService.getAll().subscribe(
      data => this.robotModels = data
    )
  }

  reset(){
    this.robotModel = new RobotModel(null,null,null,null,null,null,null,null,null);
  }

  createOrUpdate() {
    this.robotModelService.save(this.robotModel).subscribe(
      result => {
        if (this.typeExists(this.robotModel.id)) {
          this.robotModels[this.robotModels.findIndex(item => item.id == result.id)] = this.robotModel;
        } else {
          this.robotModels.push(this.robotModel)
        }
        this.robotModel = new RobotModel(null,null,null,null,null,null,null,null,null);

        this.toastr.success("Dodano lub edytowano pomyślnie");
      },
      error => {
        this.toastr.error("Wystąpił bład podczas dodawania lub edycji");
      }
    )
  }

  typeExists(id: string) {
    return this.robotModels.some(item => item.id == id);
  }

  edit(robotModel: RobotModel) {
    Object.assign(this.robotModel, robotModel)
  }

  delete(robotModel: RobotModel) {
    this.robotModelService.delete(robotModel).subscribe(
      result => {
        this.robotModels = this.robotModels.filter(item => item != robotModel)
        this.toastr.success("Usunięto pomyślnie");
        this.robotModel = new RobotModel(null,null,null,null,null,null,null,null,null);

      },
      error => {
        this.toastr.error("Wystąpił błąd podczas usuwania");
      }
    )
  }

}
