import {Property} from './Property';
import {SpecialPropertyEnum} from "./SpecialProperty/SpecialPropertyEnum";
import {AvailableProperty} from "./SpecialProperty/AvailableProperty";
import {BatteryProperty} from "./SpecialProperty/BatteryProperty";
import {IpProperty} from "./SpecialProperty/IpProperty";
import {OrientationProperty} from "./SpecialProperty/OrientationProperty";
import {PositionProperty} from "./SpecialProperty/PositionProperty";
import {SpecialProperty} from "./SpecialProperty/SpecialProperty";

export class PropertyAssembler {
  rootProperty: Property;
  specialProperties: Array<SpecialProperty>;

  constructor(name: string, obj: object) {
    this.specialProperties = new Array<SpecialProperty>();
    this.rootProperty = this.assemble(name, obj);
  }

  private assemble(name: string, obj: object): Property {
    if (Array.isArray(obj)) {
      return this.createFromArray(name, obj);
    } else {
      return this.createFromObject(name, obj);
    }
  }

  private createFromArray(name: string, arr: Array<any>): Property  {
    const result: Array<Property> = new Array<Property>();
    const namePrefix = name.replace('List', '_');
    for (const [index, prop] of arr.entries()) {
      const displayName = namePrefix + (index + 1);
      const property = this.createProperty(displayName, prop);
      property.name = this.findName(property);
      result.push(property);
    }
    return Property.complexProperty(name, result);
  }

  private findName(property: Property) {
    const value = property.getValue();
    if (Array.isArray(value)) {
      const nameProp = value.find(prop => prop.name === 'name');
      if (nameProp !== undefined) {
        return nameProp.getValue().toString();
      }
    }
    return property.name;
  }

  private createFromObject(name: string, obj: object): Property {
    const result: Array<Property> = new Array<Property>();
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        const value = obj[prop];
        const property = this.createProperty(prop, value);
        if (property != null) {
          if (this.isPropertySpecial(property)) {
            this.specialProperties.push(this.convertToSpecialProperty(property));
          } else {
            result.push(property);
          }
        }
      }
    }
    return result.length > 0 ? Property.complexProperty(name, result) : null;
  }

  private createProperty(name: string, value): Property {
    if (this.isComplex(value)) {
      return this.assemble(name, value);
    } else {
      return Property.simpleProperty(name, value);
    }
  }

  private isComplex(obj: object): boolean {
    return obj !== null && typeof(obj) === 'object';
  }

  private isPropertySpecial(property: Property) {
    const specialTypes = Object.values(SpecialPropertyEnum);
    return specialTypes.includes(property.name);
  }

  private convertToSpecialProperty(property: Property) {
    const specialEnum = SpecialPropertyEnum;
    const index = Object.values(specialEnum).indexOf(property.name);
    const propType = specialEnum[Object.keys(specialEnum)[index]];
    switch (propType) {
      case SpecialPropertyEnum.AVAILABLE:
        return new AvailableProperty(property);
      case SpecialPropertyEnum.BATTERY_LEVEL:
        return new BatteryProperty(property);
      case SpecialPropertyEnum.ORIENTATION:
        return new OrientationProperty(property);
      case SpecialPropertyEnum.POSITION:
        return new PositionProperty(property);
      case SpecialPropertyEnum.IP:
      default:
        return new IpProperty(property);
    }
  }
}
