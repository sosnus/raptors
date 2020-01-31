import {ElementFunctionality} from "./ElementFunctionality";

export class ExtraRobotElement{
  id: string;
  name: string;
  functionalityList: ElementFunctionality[];

  constructor(name: string = '',
              functionalityList: ElementFunctionality[] = []) {
    this.name = name;
    this.functionalityList = functionalityList;
  }
}
