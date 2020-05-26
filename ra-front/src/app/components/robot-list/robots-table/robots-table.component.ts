import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Robot} from "../../../model/Robots/Robot";
import {RobotService} from "../../../services/robot.service";
import {forkJoin, Observable, Subscription} from "rxjs";
import {ExtraRobotElement} from "../../../model/Robots/ExtraRobotElement";
import {RobotModel} from "../../../model/Robots/RobotModel";
import {ExtraRobotElementService} from "../../../services/type/exra-robot-element.service";
import {RobotModelService} from "../../../services/type/robot-model.service";
import {UserService} from "../../../services/user.service";
import {RobotStatus} from "../../../model/Robots/RobotStatus";
import {RobotStatusService} from "../../../services/type/robot-status.service";

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
  statuses: RobotStatus[] = [];
  password: string = '';

  constructor(private robotService: RobotService,
              private extraRobotElementService: ExtraRobotElementService,
              private robotModelService: RobotModelService,
              private userService: UserService,
              private robotStatusService: RobotStatusService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.ready = false;
    forkJoin(
      this.robotModelService.getAll(),
      this.extraRobotElementService.getAll(),
      this.robotService.getAll(),
      this.robotStatusService.getAll()
    ).subscribe(([
                   robotModels,
                   extraRobotElements,
                   robots,
                   statuses]) => {
      this.robotModels = robotModels;
      this.extraRobotElements = extraRobotElements;
      this.robots = robots;
      this.statuses = statuses;
      this.ready = true;
    });
    this.subscription = this.robotApprovedEvent.subscribe(() => this.getRobots());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
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
          this.robots.push(this.robot)
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
