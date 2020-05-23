import {AfterViewChecked, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Property} from "../../../model/GenericRobotModel/Property";
import {PropertyTypeEnum} from "../../../model/GenericRobotModel/PropertyTypeEnum";

@Component({
  selector: 'app-model-table',
  templateUrl: './model-table.component.html',
  styleUrls: ['./model-table.component.css']
})
export class ModelTableComponent {

  @Input()
  root: Property;
  @Input()
  header: string;
  @Input()
  properties;
  private prevRoot: Property;

  constructor() { }

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
