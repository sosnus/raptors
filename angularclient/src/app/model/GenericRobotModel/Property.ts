import {PropertyTypeEnum} from './PropertyTypeEnum';

export class Property {
  name: string;
  protected simpleValue: string;
  protected complexValue: Array<Property>;
  type: PropertyTypeEnum;

  static simpleProperty(name: string, value: string): Property {
    return new this(name, value, null, PropertyTypeEnum.SIMPLE);
  }

  static complexProperty(name: string, value: Array<Property>): Property {
    return new this(name, null, value, PropertyTypeEnum.COMPLEX);
  }

  protected constructor(name: string, simpleValue: string, complexValue: Array<Property>, type: PropertyTypeEnum) {
    this.name = name;
    this.simpleValue = simpleValue;
    this.complexValue = complexValue;
    this.type = type;
  }

  getName(): string {
    return this.name;
  }

  toString(): string {
    return this.type === PropertyTypeEnum.SIMPLE ? this.simpleValue : 'see more ➡';
  }

  getValue() {
    return this.type === PropertyTypeEnum.SIMPLE ? this.simpleValue : this.complexValue;
  }

  isComplex() {
    return this.type === PropertyTypeEnum.SIMPLE ? false : true;
  }
}
