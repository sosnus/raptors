import {Property} from "../Property";
import {SpecialPropertyEnum} from "./SpecialPropertyEnum";

export abstract class SpecialProperty extends Property {
  specialType: SpecialPropertyEnum;

  constructor(property: Property) {
    if (property.isComplex()) {
      super(property.name, null, property.getValue() as Array<Property>, property.type);
    } else {
      super(property.name, property.getValue() as string, null, property.type);
    }
  }

  toString(): string {
    return super.toString();
  }

  abstract getName(): string;
}
