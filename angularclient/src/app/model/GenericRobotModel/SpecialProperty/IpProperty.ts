import {SpecialProperty} from './SpecialProperty';
import {Property} from "../Property";
import {SpecialPropertyEnum} from "./SpecialPropertyEnum";

export class IpProperty extends SpecialProperty {

  constructor(prop: Property) {
    super(prop);
    this.specialType = SpecialPropertyEnum.IP;
  }

  toString(): string {
    return super.toString();
  }

  getName(): string {
    return "IP";
  }
}
