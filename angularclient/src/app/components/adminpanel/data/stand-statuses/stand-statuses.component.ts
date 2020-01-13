import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {StandStatusService} from "../../../../services/type/stand-status.service";
import {StandStatus} from "../../../../model/type/StandStatus";

@Component({
  selector: 'app-stand-statuses',
  templateUrl: './stand-statuses.component.html',
  styleUrls: ['./stand-statuses.component.css']
})
export class StandStatusesComponent implements OnInit {

  standStatuses: StandStatus[] = [];
  standStatus: StandStatus = new StandStatus(null);
  modalID = "standStatusModal";

  constructor(private standStatusService: StandStatusService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getStandStatuses();
  }

  getStandStatuses() {
    this.standStatusService.getAll().subscribe(
      data => this.standStatuses = data
    )
  }

  reset(){
    this.standStatus = new StandStatus(null);
  }

  createOrUpdate() {
    this.standStatusService.save(this.standStatus).subscribe(
      result => {
        if (this.typeExists(this.standStatus.id)) {
          this.standStatuses[this.standStatuses.findIndex(item => item.id == result.id)] = this.standStatus;
        } else {
          this.standStatuses.push(this.standStatus)
        }
        this.standStatus = new StandStatus(null);
        this.toastr.success("Dodano lub edytowano pomyślnie");
      },
      error => {
        this.toastr.error("Wystąpił bład podczas dodawania lub edycji");
      }
    )
  }

  typeExists(id: string) {
    return this.standStatuses.some(item => item.id == id);
  }

  edit(standStatus: StandStatus) {
    Object.assign(this.standStatus, standStatus)
  }

  delete(standStatus: StandStatus) {
    this.standStatusService.delete(standStatus).subscribe(
      result => {
        this.standStatuses = this.standStatuses.filter(item => item != standStatus)
        this.toastr.success("Usunięto pomyślnie");
        this.standStatus = new StandStatus(null);
      },
      error => {
        this.toastr.error("Wystąpił błąd podczas usuwania");
      }
    )
  }
}
