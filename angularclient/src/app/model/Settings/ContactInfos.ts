import {ContactInfo} from './ContactInfo';

export class ContactInfos {
  persons: ContactInfo[];


  constructor(persons: ContactInfo[]) {
    this.persons = persons;
  }
}
