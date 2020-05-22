export class ContactInfo {
  id;
  function;
  name;
  phone: number;
  mail;


  constructor(id = '', Function = '', Name = '', Phone: number = 0, Mail = '') {
    this.id = id;
    this.function = Function;
    this.name = Name;
    this.phone = Phone;
    this.mail = Mail;
  }
}
