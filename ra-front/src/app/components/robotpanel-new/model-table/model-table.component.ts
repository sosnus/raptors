import { Component, Input, } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from "../../../model/GenericRobotModel/Property";
import { PropertyTypeEnum } from "../../../model/GenericRobotModel/PropertyTypeEnum";

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
  public breadcrumbs: Array<Property> = [];

  constructor(private router: Router) {
    router.events.subscribe((val) => { this.breadcrumbs = []; })
  }

  updateRoot(prop: Property): void {
    if (prop.isComplex()) {
      this.breadcrumbs.push(prop);
    }

    if (prop.type === PropertyTypeEnum.COMPLEX) {
      this.header = prop.name;
      this.properties = prop.getValue();
    }
  }

  goToRoot(): void {
    this.breadcrumbs = [];
    this.header = this.root.name;
    this.properties = this.root.getValue();
  }

  goToSelectedItem(prop: Property, i: number): void {
    const length = this.breadcrumbs.length;
    this.breadcrumbs.splice(i, length);
    this.updateRoot(prop);
  }
}
