import { Component, OnInit } from '@angular/core';
import {PropulsionType} from "../../../../model/type/PropulsionType";
import {PropulsionTypeService} from "../../../../services/type/propulsion-type.service";
import {ToastrService} from "ngx-toastr";
import {BatteryType} from "../../../../model/type/BatteryType";

@Component({
  selector: 'app-propulsion-types',
  templateUrl: './propulsion-types.component.html',
  styleUrls: ['./propulsion-types.component.css']
})
export class PropulsionTypesComponent implements OnInit {

  propulsionTypes: PropulsionType[] = [];
  propulsionType: PropulsionType = new PropulsionType(null);
  modalID = "propulsionTypeModal";

  constructor(private propulsionTypeService: PropulsionTypeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getPropulsionTypes();
  }

  getPropulsionTypes() {
    this.propulsionTypeService.getAll().subscribe(
      data => this.propulsionTypes = data
    )
  }

  reset(){
    this.propulsionType = new PropulsionType(null);
  }

  createOrUpdate() {
    this.propulsionTypeService.save(this.propulsionType).subscribe(
      result => {
        if (this.typeExists(this.propulsionType.id)) {
          this.propulsionTypes[this.propulsionTypes.findIndex(item => item.id == result.id)] = result;
        } else {
          this.propulsionTypes.push(result)
        }
        this.propulsionType = new PropulsionType(null);
        this.toastr.success("Dodano lub edytowano pomyślnie");
      },
      error => {
        this.toastr.error("Wystąpił bład podczas dodawania lub edycji");
      }
    )
  }

  typeExists(id: string) {
    return this.propulsionTypes.some(item => item.id == id);
  }

  edit(propulsionType: PropulsionType) {
    Object.assign(this.propulsionType, propulsionType)
  }

  delete(propulsionType: PropulsionType) {
    this.propulsionTypeService.delete(propulsionType).subscribe(
      result => {
        this.propulsionTypes = this.propulsionTypes.filter(item => item != propulsionType)
        this.toastr.success("Usunięto pomyślnie");
        this.propulsionType = new PropulsionType(null);
      },
      error => {
        this.toastr.error("Wystąpił błąd podczas usuwania");
      }
    )
  }

}
