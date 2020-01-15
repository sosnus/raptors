import {Component, OnInit} from '@angular/core';
import {ParkingTypeService} from "../../../../services/type/parking-type.service";
import {ToastrService} from "ngx-toastr";
import {ParkingType} from "../../../../model/type/ParkingType";
import {BatteryType} from "../../../../model/type/BatteryType";


@Component({
  selector: 'app-parking-types',
  templateUrl: './parking-types.component.html',
  styleUrls: ['./parking-types.component.css']
})
export class ParkingTypesComponent implements OnInit {

  parkingTypes: ParkingType[] = [];
  parkingType: ParkingType = new ParkingType(null);
  modalID = "parkingTypeModal";

  constructor(private parkingTypeService: ParkingTypeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getParkingTypes();
  }

  getParkingTypes() {
    this.parkingTypeService.getAll().subscribe(
      data => this.parkingTypes = data
    )
  }

  reset(){
    this.parkingType = new ParkingType(null);
  }

  createOrUpdate() {
    this.parkingTypeService.save(this.parkingType).subscribe(
      result => {
        if (this.typeExists(this.parkingType.id)) {
          this.parkingTypes[this.parkingTypes.findIndex(item => item.id == result.id)] = result;
        } else {
          this.parkingTypes.push(result)
        }
        this.parkingType = new ParkingType(null);
        this.toastr.success("Dodano lub edytowano pomyślnie");
      },
      error => {
        this.toastr.error("Wystąpił bład podczas dodawania lub edycji");
      }
    )
  }

  typeExists(id: string) {
    return this.parkingTypes.some(item => item.id == id);
  }

  edit(parkingType: ParkingType) {
    Object.assign(this.parkingType, parkingType)
  }

  delete(parkingType: ParkingType) {
    this.parkingTypeService.delete(parkingType).subscribe(
      result => {
        this.parkingTypes = this.parkingTypes.filter(item => item != parkingType)
        this.toastr.success("Usunięto pomyślnie");
        this.parkingType = new ParkingType(null);
      },
      error => {
        this.toastr.error("Wystąpił błąd podczas usuwania");
      }
    )
  }

}
