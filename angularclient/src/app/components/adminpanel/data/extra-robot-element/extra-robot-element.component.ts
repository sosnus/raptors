import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ExtraRobotElement} from "../../../../model/Robots/ExtraRobotElement";
import {ExtraRobotElementService} from "../../../../services/type/exra-robot-element.service";
import {ElementFunctionality} from "../../../../model/Robots/ElementFunctionality";
import {ElementFunctionalityService} from "../../../../services/type/element-functionality.service";
import {Behaviour} from "../../../../model/Robots/Behaviour";

@Component({
  selector: 'app-extra-robot-element',
  templateUrl: './extra-robot-element.component.html',
  styleUrls: ['./extra-robot-element.component.css']
})
export class ExtraRobotElementComponent implements OnInit {

  extraRobotElements: ExtraRobotElement[]=[];

  extraRobotElement: ExtraRobotElement=new ExtraRobotElement(null, null);
  modalID="extraRobotElementModal";

  selectedFunctionality: string;
  elementFunctionalities: ElementFunctionality[] = [];
  elementFunctionality: ElementFunctionality = new ElementFunctionality(null);


  constructor(private extraRobotElementService: ExtraRobotElementService,
              private elementFunctionalityService: ElementFunctionalityService,
              private toastr: ToastrService) {
    this.extraRobotElement.functionalityList = new Array<Behaviour>();
  }

  ngOnInit() {
    this.getExtraRobotElements();
    this.getElementFunctionalities();
  }

  getExtraRobotElements(){
    this.extraRobotElementService.getAll().subscribe(
      data=>this.extraRobotElements=data
    )
  }

  getElementFunctionalities(){
    this.elementFunctionalityService.getAll().subscribe(
      functionalities => {
        this.elementFunctionalities = functionalities;
      }
    );
  }

  reset(){
    this.extraRobotElement=new ExtraRobotElement(null, null);
  }


  createOrUpdate(){
    this.extraRobotElementService.save(this.extraRobotElement).subscribe(
      result=>{
        if(this.typeExists(this.extraRobotElement.id)){
          this.extraRobotElements[this.extraRobotElements.findIndex(item=>item.id==result.id)]=result;
        } else {
          this.extraRobotElements.push(result)
        }
        this.extraRobotElement=new ExtraRobotElement(null, null);
        this.toastr.success("Dodano lub edytowano pomyślnie");
      },
      error => {
        this.toastr.error("Wystąpił bład podczas dodawania lub edycji")
      }
    )
  }

  typeExists(id: string){
    return this.extraRobotElements.some(item=> item.id==id);
  }

  edit(extraRobotElement:ExtraRobotElement){
    Object.assign(this.extraRobotElement,extraRobotElement)
  }

  delete(extraRobotElement:ExtraRobotElement){
    this.extraRobotElementService.delete(extraRobotElement).subscribe(
      result=>{
        this.extraRobotElements=this.extraRobotElements.filter(item=>item!=extraRobotElement)
        this.toastr.success("Usunięto pomyślnie");
        this.extraRobotElement=new ExtraRobotElement(null, null);
      },
      error => {
        this.toastr.error("Wystąpił błąd podczas usuwania")
      }
    )
  }

  selectFunctionalities(id: string) {
    console.log(id);
    this.selectedFunctionality = id;
    this.elementFunctionalities.forEach(functionality=>{
      if(functionality.id === this.selectedFunctionality){
        console.log("test: " + functionality.name);
        this.extraRobotElement.functionalityList.push(functionality);
      }
    });
  }

}
