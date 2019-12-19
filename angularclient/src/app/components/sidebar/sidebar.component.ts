import { Component, OnInit } from '@angular/core';
import {RobotService} from "../../services/robot.service";
import {StoreService} from "../../services/store.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  robotDataloaded = false;
  private robotIDlist = [];

  private i=0;
  private j=0;
  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    //console.log("test: " + this.storeService.robotsObjects[1].robotIP);
    this.storeService.getRobotIDlist().subscribe(
      rob => {
        this.robotDataloaded = true;
        this.robotIDlist = rob;
        console.log("Pobieram listę id robotów: " + this.robotIDlist);
      }
    );


  }

  rotateIcon(elementID: string): void {
    document.getElementById(elementID).classList.toggle('down');
  }

  showRobotOnMap(){
    /* for(this.i=0;this.i<=this.robotIDlist.length;this.i++){
       for(this.j=0; this.j<=this.storeService.robotsObjects.length;this.j++){
         if(this.robotIDlist[this.i]===this.storeService.robotsObjects[0].id){
           console.log("IP robota o id "+this.robotIDlist[this.i] + " to: " + this.storeService.robotsObjects[this.j].robotIP)
         }
       }
     }*/
  }


}
