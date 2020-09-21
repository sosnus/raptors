import {SpecialProperty} from './SpecialProperty';
import {Property} from "../Property";
import {SpecialPropertyEnum} from "./SpecialPropertyEnum";

export class AvailableProperty extends SpecialProperty {

  constructor(prop: Property) {
    super(prop);
    this.specialType = SpecialPropertyEnum.AVAILABLE;
  }

  toString(): string {
    const value = this.getValue();
    if(value === null || value === undefined || value === 'undefined'){
      return "no data 🟠"
    }
    return value.toString().toLowerCase() === "true" ? "online 🟢" : "offline 🔴";
  }

  getName(): string {
    return "Status";
  }
}
