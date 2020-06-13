import {SpecialProperty} from './SpecialProperty';
import {Property} from "../Property";
import {SpecialPropertyEnum} from "./SpecialPropertyEnum";

export class PositionProperty extends SpecialProperty {

  constructor(prop: Property) {
    super(prop);
    this.specialType = SpecialPropertyEnum.POSITION;
  }

  toString(): string {
    if(this.isComplex()){
      const values = this.getValue() as Array<Property>;
      const x = values.find(value => value.name === 'x').getValue();
      const y = values.find(value => value.name === 'y').getValue();
      const z = values.find(value => value.name === 'z').getValue();
      return `X ${Number(x).toFixed(2)} : Y ${Number(y).toFixed(2)} : Z ${Number(z).toFixed(2)}`;
    } else {
      return super.toString();
    }
  }

  getName(): string {
    return "Pozycja";
  }
}
