import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {User} from "../../model/User/User";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-userspanel',
  templateUrl: './userspanel.component.html',
  styleUrls: ['./userspanel.component.css']
})
export class UserspanelComponent implements OnInit {

  users: User[] = [];
  user: User = new User();
  modalID = "userModal";
  roles = [];
  selectedRoles = ['ROLE_REGULAR_USER', 'ROLE_SUPER_USER'];

  constructor(private userService: UserService,
              private toastr: ToastrService) {
    this.getRoleNameList();
  }

  private getRoleNameList() {
    for (let key in this.userService.roles) {
      this.roles.push(this.userService.roles[key])
    }
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll().subscribe(
      data => {
        this.users = data;
        this.users = this.users.map(user => {
          user.password = '';
          return user
        });
      },
      error => this.toastr.error('Błąd podczas łączenia z bazą: ' + error.message)
    )
  }

  getRoles(roles: string[]) {
    return roles.map(role => {
      return this.userService.getRoleName(role)
    })
  }

  reset() {
    this.user = new User();
  }

  createOrUpdate() {
    this.userService.save(this.user).subscribe(
      result => {
        if (this.userExists(this.user.id)) {
          this.users[this.users.findIndex(item => item.id == this.user.id)] = this.user;
        } else {
          this.users.push(this.user)
        }
        this.user = new User();
        this.toastr.success("Dodano lub edytowano pomyślnie");
      },
      error => {
        this.toastr.error("Wystąpił bład podczas dodawania lub edycji");
      }
    )
  }

  userExists(id: string) {
    return this.users.some(item => item.id == id);
  }

  edit(user: User) {
    Object.assign(this.user, user)
  }

  delete(user: User) {
    this.userService.delete(user).subscribe(
      result => {
        this.users = this.users.filter(item => item != user)
        this.toastr.success("Usunięto pomyślnie");
        this.user = new User();
      },
      error => {
        this.toastr.error("Wystąpił błąd podczas usuwania");
      }
    )
  }
}
