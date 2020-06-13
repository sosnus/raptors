import {SpecialProperty} from './SpecialProperty';
import {Property} from "../Property";
import {SpecialPropertyEnum} from "./SpecialPropertyEnum";

export class BatteryProperty extends SpecialProperty {

  constructor(prop: Property) {
    super(prop);
    this.specialType = SpecialPropertyEnum.BATTERY_LEVEL;
  }

  toString(): string {
    return Number(super.toString()).toFixed(0) + "%";
  }

  getName(): string {
    return "Bateria";
  }
}
