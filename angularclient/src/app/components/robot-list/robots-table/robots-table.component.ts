import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Robot} from "../../../model/Robots/Robot";
import {RobotService} from "../../../services/robot.service";
import {Observable, Subscription} from "rxjs";

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

  constructor(private robotService: RobotService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getRobots();
    this.subscription = this.robotApprovedEvent.subscribe(() => this.getRobots());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  getRobots() {
    this.ready = false;
    this.robotService.getRobots().subscribe(
      data => {
        this.robots = data;
        this.ready = true;
      }
    )
  }

  reset() {
    this.robot = new Robot();
  }

  createOrUpdate() {
    this.robotService.save(this.robot).subscribe(
      result => {
        if (this.typeExists(this.robot.id)) {
          this.robots[this.robots.findIndex(item => item.id == result.id)] = result;
        } else {
          this.robots.push(result)
        }
        this.robot = new Robot();
        this.toastr.success("Dodano lub edytowano pomyślnie");
      },
      error => {
        this.toastr.error("Wystąpił bład podczas dodawania lub edycji");
      }
    )
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
}
