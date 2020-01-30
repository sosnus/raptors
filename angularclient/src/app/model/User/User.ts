export class User {
  id: string;
  email: string;
  password: string;
  rolesIDs: string[]; //nazwy ról

  constructor(
    id: string = null,
    email: string = null,
    password: string = null,
    rolesIDs: string[] = ['ROLE_REGULAR_USER']) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.rolesIDs = rolesIDs;
  }
}
