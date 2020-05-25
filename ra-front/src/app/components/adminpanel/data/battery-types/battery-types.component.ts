import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {BatteryType} from "../../../../model/type/BatteryType";
import {BatteryTypeService} from "../../../../services/type/battery-type.service";
import {AreaType} from "../../../../model/type/AreaType";

@Component({
  selector: 'app-battery-types',
  templateUrl: './battery-types.component.html',
  styleUrls: ['./battery-types.component.css']
})
export class BatteryTypesComponent implements OnInit {

  batteryTypes: BatteryType[] = [];
  batteryType: BatteryType = new BatteryType();
  modalID = "batteryFormModal";

  constructor(private batteryTypeService: BatteryTypeService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getAreaTypes();
  }

  getAreaTypes() {
    this.batteryTypeService.getAll().subscribe(
      data => this.batteryTypes = data
    )
  }

  reset(){
    this.batteryType = new BatteryType();
  }

  createOrUpdate() {
    this.batteryTypeService.save(this.batteryType).subscribe(
      result => {
        if (this.typeExists(this.batteryType.id)) {
          this.batteryTypes[this.batteryTypes.findIndex(item => item.id == result.id)] = result;
        } else {
          this.batteryTypes.push(result)
        }
        this.batteryType = new BatteryType();
        this.toastr.success("Dodano lub edytowano pomyślnie");
      },
      error => {
        this.toastr.error("Wystąpił bład podczas dodawania lub edycji");
      }
    )
  }

  typeExists(id: string) {
    return this.batteryTypes.some(item => item.id == id);
  }

  edit(batteryType: BatteryType) {
    Object.assign(this.batteryType, batteryType)
  }

  delete(batteryType: BatteryType) {
    this.batteryTypeService.delete(batteryType).subscribe(
      result => {
        this.batteryTypes = this.batteryTypes.filter(item => item != batteryType);
        this.toastr.success("Usunięto pomyślnie");
        this.batteryType = new BatteryType();
      },
      error => {
        this.toastr.error("Wystąpił błąd podczas usuwania");
      }
    )
  }
}
