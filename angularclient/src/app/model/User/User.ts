export class User {
  id: string;
  email: string;
  password: string;
  roles: string[];

  constructor(
    id: string = null,
    email: string = null,
    password: string = null,
    roles: string[] = ['ROLE_REGULAR_USER']) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }
}
