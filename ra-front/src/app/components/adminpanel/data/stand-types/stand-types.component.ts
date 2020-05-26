import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {StandType} from "../../../../model/type/StandType";
import {StandTypeService} from "../../../../services/type/stand-type.service";

@Component({
  selector: 'app-stand-types',
  templateUrl: './stand-types.component.html',
  styleUrls: ['./stand-types.component.css']
})
export class StandTypesComponent implements OnInit {

  standTypes: StandType[] = [];
  standType: StandType = new StandType(null);
  modalID = "standTypeModal";

  constructor(private standTypeService: StandTypeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getStandTypes();
  }

  getStandTypes() {
    this.standTypeService.getAll().subscribe(
      data => this.standTypes = data
    )
  }

  reset(){
    this.standType = new StandType(null);
  }

  createOrUpdate() {
    this.standTypeService.save(this.standType).subscribe(
      result => {
        if (this.typeExists(this.standType.id)) {
          this.standTypes[this.standTypes.findIndex(item => item.id == result.id)] = result;
        } else {
          this.standTypes.push(result)
        }
        this.standType = new StandType(null);
        this.toastr.success("Dodano lub edytowano pomyślnie");
      },
      error => {
        this.toastr.error("Wystąpił bład podczas dodawania lub edycji");
      }
    )
  }

  typeExists(id: string) {
    return this.standTypes.some(item => item.id == id);
  }

  edit(standType: StandType) {
    Object.assign(this.standType, standType)
  }

  delete(standType: StandType) {
    this.standTypeService.delete(standType).subscribe(
      result => {
        this.standTypes = this.standTypes.filter(item => item != standType)
        this.toastr.success("Usunięto pomyślnie");
        this.standType = new StandType(null);
      },
      error => {
        this.toastr.error("Wystąpił błąd podczas usuwania");
      }
    )
  }
}
