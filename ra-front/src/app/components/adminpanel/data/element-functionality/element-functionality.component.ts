import { Component, OnInit } from '@angular/core';
import {ElementFunctionality} from "../../../../model/Robots/ElementFunctionality";
import {ElementFunctionalityService} from "../../../../services/type/element-functionality.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-element-functionality',
  templateUrl: './element-functionality.component.html',
  styleUrls: ['./element-functionality.component.css']
})
export class ElementFunctionalityComponent implements OnInit {

  elementFunctionalities: ElementFunctionality[]=[];
  elementFunctionality: ElementFunctionality=new ElementFunctionality(null);
  modalID="elementFunctionalityModal";

  constructor(private elementFunctionalityService: ElementFunctionalityService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getElementFunctionalities();
  }

  getElementFunctionalities(){
    this.elementFunctionalityService.getAll().subscribe(
      data=>this.elementFunctionalities=data
    )
  }

  reset(){
    this.elementFunctionality=new ElementFunctionality(null);
  }


  createOrUpdate(){
    this.elementFunctionalityService.save(this.elementFunctionality).subscribe(
      result=>{
        if(this.typeExists(this.elementFunctionality.id)){
          this.elementFunctionalities[this.elementFunctionalities.findIndex(item=>item.id==result.id)]=result;
        } else {
          this.elementFunctionalities.push(result)
        }
        this.elementFunctionality=new ElementFunctionality(null);
        this.toastr.success("Dodano lub edytowano pomyślnie");
      },
      error => {
        this.toastr.error("Wystąpił bład podczas dodawania lub edycji")
      }
    )
  }

  typeExists(id: string){
    return this.elementFunctionalities.some(item=> item.id==id);
  }

  edit(elementFunctionality:ElementFunctionality){
    Object.assign(this.elementFunctionality,elementFunctionality)
  }

  delete(elementFunctionality:ElementFunctionality){
    this.elementFunctionalityService.delete(elementFunctionality).subscribe(
      result=>{
        this.elementFunctionalities=this.elementFunctionalities.filter(item=>item!=elementFunctionality)
        this.toastr.success("Usunięto pomyślnie");
        this.elementFunctionality=new ElementFunctionality(null);
      },
      error => {
        this.toastr.error("Wystąpił błąd podczas usuwania")
      }
    )
  }

}
