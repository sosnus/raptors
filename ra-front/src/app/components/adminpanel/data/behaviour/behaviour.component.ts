import { Component, OnInit } from '@angular/core';
import {Behaviour} from "../../../../model/Robots/Behaviour";
import {BehaviourService} from "../../../../services/type/behaviour.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-behaviour',
  templateUrl: './behaviour.component.html',
  styleUrls: ['./behaviour.component.css']
})
export class BehaviourComponent implements OnInit {

behaviours: Behaviour[]=[];
behaviour: Behaviour=new Behaviour(null,null);
modalID="behaviourModal";

  constructor(private behaviourService:BehaviourService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getBehaviours();
  }

  getBehaviours(){
   this.behaviourService.getAll().subscribe(
     data=>this.behaviours=data
   )
  }

  reset(){
    this.behaviour=new Behaviour(null,null);
  }

  createOrUpdate(){
    this.behaviourService.save(this.behaviour).subscribe(
      result=>{
        if(this.typeExists(this.behaviour.id)){
          this.behaviours[this.behaviours.findIndex(item=>item.id==result.id)]=result;
        } else {
          this.behaviours.push(result)
        }
        this.behaviour=new Behaviour(null,null);
        this.toastr.success("Dodano lub edytowano pomyślnie");
      },
      error => {
        this.toastr.error("Wystąpił bład podczas dodawania lub edycji")
      }
    )
  }

  typeExists(id: string){
    return this.behaviours.some(item=> item.id==id);
  }

  edit(behaviour:Behaviour){
    Object.assign(this.behaviour,behaviour)
  }

  delete(behaviour:Behaviour){
    this.behaviourService.delete(behaviour).subscribe(
      result=>{
        this.behaviours=this.behaviours.filter(item=>item!=behaviour)
        this.toastr.success("Usunięto pomyślnie");
        this.behaviour=new Behaviour(null,null);
      },
      error => {
        this.toastr.error("Wystąpił błąd podczas usuwania")
      }
    )
  }

}
