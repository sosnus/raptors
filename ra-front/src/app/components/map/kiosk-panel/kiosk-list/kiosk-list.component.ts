import { Component, OnInit } from '@angular/core';
import {Kiosk} from "../../../../model/Kiosk/Kiosk";
import {KioskService} from "../../../../services/kiosk.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-kiosk-list',
  templateUrl: './kiosk-list.component.html',
  styleUrls: ['./kiosk-list.component.css']
})
export class KioskListComponent implements OnInit {

  kiosks: Kiosk[] = [];
  kiosk: Kiosk = new Kiosk(null);
  modalID = "kioskModal";

  constructor(private kioskService: KioskService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getKiosks();
  }

  getKiosks() {
    this.kioskService.getAll().subscribe(
      data => this.kiosks = data
    )
  }

  reset(){
    this.kiosk = new Kiosk(null);
  }

  createOrUpdate() {
    this.kioskService.save(this.kiosk).subscribe(
      result => {
        if (this.typeExists(this.kiosk.id)) {
          this.kiosks[this.kiosks.findIndex(item => item.id == result.id)] = result;
        } else {
          this.kiosks.push(result)
        }
        this.kiosk = new Kiosk(null);
        this.toastr.success("Dodano lub edytowano pomyślnie");
      },
      error => {
        this.toastr.error("Wystąpił bład podczas dodawania lub edycji");
      }
    )
  }

  typeExists(id: string) {
    return this.kiosks.some(item => item.id == id);
  }

  edit(kiosk: Kiosk) {
    Object.assign(this.kiosk, kiosk)
  }

  delete(kioskId: string) {
    this.kioskService.delete(kioskId).subscribe(
      result => {
        this.kiosks = this.kiosks.filter(item => item.id != kioskId)
        this.toastr.success("Usunięto pomyślnie");
        this.kiosk = new Kiosk(null);
      },
      error => {
        this.toastr.error("Wystąpił błąd podczas usuwania");
      }
    )
  }

}
