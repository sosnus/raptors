import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Robot} from "../../../model/Robots/Robot";
import {RobotTask} from "../../../model/Robots/RobotTask";
import {Polygon} from "../../../model/MapAreas/Polygons/Polygon";
import {RobotTaskService} from "../../../services/robotTask.service";
import {ToastrService} from "ngx-toastr";
import {StoreService} from "../../../services/store.service";
import {RobotService} from "../../../services/robot.service";
import {AreaType} from "../../../model/type/AreaType";

@Component({
  selector: 'app-taskpanel-details',
  templateUrl: './taskpanel-details.component.html',
  styleUrls: ['./taskpanel-details.component.css']
})
export class TaskpanelDetailsComponent implements OnInit {

  @Input()
  task: RobotTask;

  robots: Robot[] = [];
  robot = new Robot(null, null, null, null, null, null, null, null, null);
  robotTasks: RobotTask[]=[];
  selectedRobot: string;

  constructor(private robotService: RobotService, private robotTaskService: RobotTaskService,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.robotService.getRobots().subscribe(robots=>{
      this.robots=robots;
      console.log("Pobrana lista robotów: " + this.robots);
    });

    this.getTasks();
  }


  getTasks() {
    this.robotTaskService.getRobotTasks().subscribe(
      data => this.robotTasks = data
    )
  }

  selectRobot(id: string) {
    console.log(id);
    this.selectedRobot = id;
    this.createOrUpdate();
  }

  createOrUpdate() {
    this.robotService.getRobot(this.selectedRobot).subscribe(robot=>{
      this.task.robot=robot;
      this.robotTaskService.save(this.task).subscribe(
        result => {
          if (this.typeExists(this.task.id)) {
            this.robotTasks[this.robotTasks.findIndex(item => item.id == result.id)] = result;
          } else {
            this.robotTasks.push(result)
          }
          //this.task = new AreaType(null, null);
          this.toastr.success("Dodano robota pomyślnie");
          console.log(result);
        },
        error => {
          this.toastr.error("Wystąpił bład podczas dodawania");
        }
      )
    });


  }

  typeExists(id: string) {
    return this.robotTasks.some(item => item.id == id);
  }

}
