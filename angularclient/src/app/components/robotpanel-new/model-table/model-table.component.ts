import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {Property} from "../../../model/GenericRobotModel/Property";
import {PropertyTypeEnum} from "../../../model/GenericRobotModel/PropertyTypeEnum";

@Component({
  selector: 'app-model-table',
  templateUrl: './model-table.component.html',
  styleUrls: ['./model-table.component.css']
})
export class ModelTableComponent implements OnInit, AfterViewChecked {

  @Input()
  root: Property;
  private prevRoot: Property;
  header: string;
  properties;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.goToRoot();
  }

  updateRoot(prop: Property): void {
    if (prop.type === PropertyTypeEnum.COMPLEX) {
      this.header = prop.name;
      this.properties = prop.getValue();
    }
  }

  goToRoot(): void {
    this.header = this.root.name;
    this.properties = this.root.getValue();
  }
}
