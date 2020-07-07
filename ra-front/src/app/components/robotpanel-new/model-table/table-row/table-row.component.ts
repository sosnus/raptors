import { Component, Input, OnInit } from '@angular/core';
import { Property } from "../../../../model/GenericRobotModel/Property";

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit {

  @Input()
  prop: Property;

  constructor() { }

  ngOnInit() {
  }
}
