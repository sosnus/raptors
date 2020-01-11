import {Component, OnInit} from '@angular/core';
import {AreaType} from "../../../../model/type/AreaType";
import {AreaTypeService} from "../../../../services/type/area-type.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-area-types',
  templateUrl: './area-types.component.html',
  styleUrls: ['./area-types.component.css']
})
export class AreaTypesComponent implements OnInit {

  areaTypes: AreaType[] = [];
  areaType: AreaType = new AreaType(null);
  modalID = "areaTypeModal";

  constructor(private areaTypeService: AreaTypeService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getAreaTypes();
  }

  getAreaTypes() {
    this.areaTypeService.getAll().subscribe(
      data => this.areaTypes = data
    )
  }

  createOrUpdate() {
    this.areaTypeService.save(this.areaType).subscribe(
      result => {
        if (this.typeExists(this.areaType.id)) {
          this.areaTypes[this.areaTypes.findIndex(item => item.id == result.id)] = this.areaType;
        } else {
          this.areaTypes.push(this.areaType)
        }
        this.areaType = new AreaType(null);
        this.toastr.success("Dodano lub edytowano pomyślnie");
      },
      error => {
        this.toastr.error("Wystąpił bład podczas dodawania lub edycji");
      }
    )
  }

  typeExists(id: string) {
    return this.areaTypes.some(item => item.id == id);
  }

  edit(areaType: AreaType) {
    Object.assign(this.areaType, areaType)
  }

  delete(areaType: AreaType) {
    this.areaTypeService.delete(areaType).subscribe(
      result => {
        this.areaTypes = this.areaTypes.filter(item => item != areaType)
        this.toastr.success("Usunięto pomyślnie");
        this.areaType = new AreaType(null);
      },
      error => {
        this.toastr.error("Wystąpił błąd podczas usuwania");
      }
    )
  }
}
