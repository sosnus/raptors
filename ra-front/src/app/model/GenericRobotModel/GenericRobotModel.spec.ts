import {Property} from './Property';
import {PropertyAssembler} from './PropertyAssembler';

describe('Property', () => {
  it('#toString should return value for simple property', () => {
    const property = Property.simpleProperty('name', 'value');
    expect(property.toString()).toBe('value');
  });

  it('#toString should return "see more" for complex property', () => {
    const property = Property.complexProperty('name', null);
    expect(property.toString()).toBe('see more ➡');
  });

  it('#getValue should return proper value for both property types', () => {
    const simp = Property.simpleProperty('name', 'value');
    const comp = Property.complexProperty('name', [simp]);

    expect(simp.getValue()).toBe('value');
    expect(comp.getValue()).toEqual([simp]);
  });

  it('#isComplex should return true for complex property', () => {
    const property = Property.complexProperty('name', null);
    expect(property.isComplex()).toBe(true);
  });
});

describe('PropertyFactory', () => {
  let property: Property;

  beforeAll(() => {
    const json = `
      {
        "simp":"simpName",
        "obj":{
          "name":"object"
        },
        "list":[
          {
            "id":"1",
            "name":"l1"
          },
          {
            "id":"2",
            "name":"l2"
          }
        ]
      }`;
    const object = JSON.parse(json);
    property = new PropertyAssembler('object', object).rootProperty;
  });

  it('#createFromObject should create a property for every field', () => {
    expect(property.getValue().length).toBe(3);
  });

  it('#createFromObject should create a simple property for a value field', () => {
    const simp = property.getValue()[0] as Property;
    expect(simp.isComplex()).toBe(false);
  });

  it('#createFromObject should create a complex property for an object field', () => {
    const obj = property.getValue()[1] as Property;
    expect(obj.isComplex()).toBe(true);
  });

  it('#createFromObject should create a complex property for an array field', () => {
    const list = property.getValue()[2] as Property;
    expect(list.isComplex()).toBe(true);
  });

  it('#createFromObject should change names for array fields', () => {
    const list = property.getValue()[2] as Property;
    const listItem = list.getValue()[0] as Property;
    expect(listItem.name).toBe('l1');
  });
});

