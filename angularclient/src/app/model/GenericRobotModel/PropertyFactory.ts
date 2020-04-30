import {Property} from './Property';

export class PropertyFactory {
  static createFromObject(name: string, obj: object) {
    if (Array.isArray(obj)) {
      return createFromArray(name, obj);
    } else {
      return createFromObject(name, obj);
    }
  }
}

function createFromObject(name: string, obj: object) {
  const result: Array<Property> = new Array<Property>();
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      const value = obj[prop];
      let property;
      if (isComplex(value)) {
        property = PropertyFactory.createFromObject(prop, value);
      } else {
        property = Property.simpleProperty(prop, value);
      }
      result.push(property);
    }
  }
  return Property.complexProperty(name, result);
}

function createFromArray(name: string, arr: Array<any>) {
  const result: Array<Property> = new Array<Property>();
  const namePrefix = name.replace('List', '_');
  for (const [index, prop] of arr.entries()) {
    let property;
    const displayName = namePrefix + (index + 1);
    if (isComplex(prop)) {
      property = PropertyFactory.createFromObject(displayName, prop);
    } else {
      property = Property.simpleProperty(displayName, prop);
    }
    result.push(property);
  }
  return Property.complexProperty(name, result);
}

function isComplex(obj: object): boolean {
  return typeof(obj) === 'object';
}
