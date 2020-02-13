import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Robot} from "../../../model/Robots/Robot";
import {RobotTask} from "../../../model/Robots/RobotTask";
import {RobotTaskService} from "../../../services/robotTask.service";
import {ToastrService} from "ngx-toastr";
import {RobotService} from "../../../services/robot.service";
import {AuthService} from "../../../services/auth.service";

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

  constructor(private robotService: RobotService, private robotTaskService: RobotTaskService,private authService: AuthService,
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
      // pobierz tylko roboty, które mają status free
      // przypisz mu, że juz nie ma zadania, czyli, gdzie robot.status.incluses"free"

      // uaktualnij status robota z free na zajęty
      // uaktualnij status zadania z waiting na zajęte
      //robot.status.includes();
      this.robotTaskService.save(this.task).subscribe(
        result => {
          if (this.typeExists(this.task.id)) {
            this.robotTasks[this.robotTasks.findIndex(item => item.id == result.id)] = result;
          } else {
            this.robotTasks.push(result)
          }
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

  checkRole(){
    if(this.authService.isAdmin() || this.authService.isServiceman()){
      return true;
    }
    return null;
  }

  checkIsTaskFree(){
    if(this.task.status === "waiting"){
      console.log("Status: "  + this.task.status)
      return true;
    }
    return null;
  }

  checkAccess(){
    if(this.checkRole() && this.checkIsTaskFree()){
      return true;
    }
    return null;
  }

}
