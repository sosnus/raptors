import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {RobotStatus} from "../../../../model/Robots/RobotStatus";
import {RobotStatusService} from "../../../../services/type/robot-status.service";

@Component({
  selector: 'app-robot-statuses',
  templateUrl: './robot-statuses.component.html',
  styleUrls: ['./robot-statuses.component.css']
})
export class RobotStatusesComponent implements OnInit {

  robotStatuses: RobotStatus[] = [];
  robotStatus: RobotStatus = new RobotStatus(null);
  modalID = "robotStatusModal";

  constructor(private robotStatusService: RobotStatusService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getRobotStatuses();
  }

  getRobotStatuses() {
    this.robotStatusService.getAll().subscribe(
      data => this.robotStatuses = data
    )
  }

  reset(){
    this.robotStatus = new RobotStatus(null);
  }

  createOrUpdate() {
    this.robotStatusService.save(this.robotStatus).subscribe(
      result => {
        if (this.typeExists(this.robotStatus.id)) {
          this.robotStatuses[this.robotStatuses.findIndex(item => item.id == result.id)] = this.robotStatus;
        } else {
          this.robotStatuses.push(this.robotStatus)
        }
        this.robotStatus = new RobotStatus(null);
        this.toastr.success("Dodano lub edytowano pomyślnie");
      },
      error => {
        this.toastr.error("Wystąpił bład podczas dodawania lub edycji");
      }
    )
  }

  typeExists(id: string) {
    return this.robotStatuses.some(item => item.id == id);
  }

  edit(robotStatus: RobotStatus) {
    Object.assign(this.robotStatus, robotStatus)
  }

  delete(robotStatus: RobotStatus) {
    this.robotStatusService.delete(robotStatus).subscribe(
      result => {
        this.robotStatuses = this.robotStatuses.filter(item => item != robotStatus)
        this.toastr.success("Usunięto pomyślnie");
        this.robotStatus = new RobotStatus(null);
      },
      error => {
        this.toastr.error("Wystąpił błąd podczas usuwania");
      }
    )
  }

}
