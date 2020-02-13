import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Robot} from "../../../model/Robots/Robot";
import {RobotService} from "../../../services/robot.service";
import {Observable, Subscription} from "rxjs";
import {ExtraRobotElement} from "../../../model/Robots/ExtraRobotElement";
import {RobotModel} from "../../../model/Robots/RobotModel";
import {ExtraRobotElementService} from "../../../services/type/exra-robot-element.service";
import {RobotModelService} from "../../../services/type/robot-model.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-robots-table',
  templateUrl: './robots-table.component.html',
  styleUrls: ['./robots-table.component.css']
})
export class RobotsTableComponent implements OnInit, OnDestroy {

  @Input() robotApprovedEvent: Observable<void>;
  private subscription: Subscription;

  robots: Robot[] = [];
  robot: Robot = new Robot();
  modalID = "robotModal";

  ready: boolean = false;

  extraRobotElements: ExtraRobotElement[] = [];
  robotModels: RobotModel[] = [];
  password: string = '';

  constructor(private robotService: RobotService,
              private extraRobotElementService: ExtraRobotElementService,
              private robotModelService: RobotModelService,
              private userService: UserService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getRobots();
    this.getRobotModels();
    this.getExtraElements();
    this.subscription = this.robotApprovedEvent.subscribe(() => this.getRobots());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  getRobotModels() {
    this.ready = false;
    this.robotModelService.getAll().subscribe(
      data => {
        this.robotModels = data;
        this.ready = true;
      }
    )
  }

  getExtraElements() {
    this.ready = false;
    this.extraRobotElementService.getAll().subscribe(
      data => {
        this.extraRobotElements = data;
        this.ready = true;
      }
    )
  }

  getRobots() {
    this.ready = false;
    this.robotService.getAll().subscribe(
      data => {
        this.robots = data;
        this.ready = true;
      }
    )
  }


  reset() {
    this.robot = new Robot();
    this.password = '';
  }

  createOrUpdate() {
    if (this.typeExists(this.robot.id)) {
      this.robotService.update(this.robot, this.password).subscribe(
        result => {
          this.robots[this.robots.findIndex(item => item.id == this.robot.id)] = this.robot;
          this.robot = new Robot();
          this.password = '';
          this.toastr.success("Dodano pomyślnie");
        },
        error => {
          this.toastr.error("Wystąpił bład podczas aktualizacji");
        }
      )
    } else {
      this.robotService.save(this.robot, this.password).subscribe(
        result => {
          this.robots[this.robots.findIndex(item => item.id == this.robot.id)] = this.robot;
          this.robot = new Robot();
          this.password = '';
          this.toastr.success("Aktualizowano pomyślnie");
        },
        error => {
          this.toastr.error("Wystąpił bład podczas aktualizacji");
        }
      )
    }
  }

  typeExists(id: string) {
    return this.robots.some(item => item.id == id);
  }

  edit(robot: Robot) {
    Object.assign(this.robot, robot)
  }

  delete(robot: Robot) {
    this.robotService.delete(robot).subscribe(
      result => {
        this.robots = this.robots.filter(item => item != robot)
        this.toastr.success("Usunięto pomyślnie");
        this.robot = new Robot();
      },
      error => {
        this.toastr.error("Wystąpił błąd podczas usuwania");
      }
    )
  }

  compareItems(id1: any, id2: any): boolean {
    return id1.id === id2.id;
  }
}
