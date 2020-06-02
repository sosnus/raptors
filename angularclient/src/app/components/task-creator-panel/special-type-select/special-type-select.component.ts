import { Component, OnInit, Input } from '@angular/core';
import { StandService } from 'src/app/services/stand.service';

@Component({
  selector: 'app-special-type-select',
  templateUrl: './special-type-select.component.html',
  styleUrls: ['./special-type-select.component.css']
})
export class SpecialTypeSelectComponent implements OnInit {
  @Input() typeName = "";
  @Input() displayName = "";
  specialTypes: any[] = [];

  constructor(private standService: StandService) { }

  ngOnInit() {
    if (this.typeName === 'stand') {
      this.standService.getAll().subscribe(res => {
        this.specialTypes = res;
      });

    }
  }

}
