import {ElementFunctionality} from "./ElementFunctionality";

export class ExtraRobotElement{
  id: string;
  name: string;
  dimension: string;
  functionalityList: ElementFunctionality[];

  constructor(name: string = '', dimension: string = '',
              functionalityList: ElementFunctionality[] = []) {
    this.name = name;
    this.dimension = dimension;
    this.functionalityList = functionalityList;
  }
}
