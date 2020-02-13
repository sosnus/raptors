import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Robot} from "../../../model/Robots/Robot";
import {RobotTask} from "../../../model/Robots/RobotTask";
import {RobotTaskService} from "../../../services/robotTask.service";
import {ToastrService} from "ngx-toastr";
import {RobotService} from "../../../services/robot.service";
import {AuthService} from "../../../services/auth.service";
import {RobotStatusService} from "../../../services/type/robot-status.service";
import {RobotStatus} from "../../../model/Robots/RobotStatus";

@Component({
  selector: 'app-taskpanel-details',
  templateUrl: './taskpanel-details.component.html',
  styleUrls: ['./taskpanel-details.component.css']
})
export class TaskpanelDetailsComponent implements OnInit {

  @Input()
  task: RobotTask;

  robots: Robot[] = [];
  robotsFromDB: Robot[] = [];
  //freeRobots: Robot[] = [];
  robot = new Robot(null, null, null, null, null, null, null, null, null);
  robotTasks: RobotTask[]=[];
  selectedRobot: string;
  robotStatusFree: RobotStatus = new RobotStatus(null);

  constructor(private robotService: RobotService, private robotTaskService: RobotTaskService,private authService: AuthService,
              private robotStatusService: RobotStatusService, private toastr: ToastrService) {

  }

  ngOnInit() {

    this.getTasks();
    this.robotService.getAll().subscribe(robots=>{
      this.robots=robots;
      this.robotsFromDB=robots;
      this.robotStatusService.getAll().subscribe(robotStatus=>{

        // pobierz tylko roboty, które mają status free
        robotStatus.forEach(freeStatus=>{
          if(freeStatus.name==="free"){
            this.robotStatusFree = freeStatus;
            this.robots = this.robots.filter(robot=> robot.status.some(state=>state.id=== this.robotStatusFree.id));
          }
        });
      });
    });
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
    this.robotService.getByID(this.selectedRobot).subscribe(robot=>{
      this.task.robot=robot;
      // uaktualnij status zadania z waiting na zajęte
      this.task.status="on going";

      // przypisz mu, że juz nie ma zadania, czyli, gdzie robot.status.incluses"free"

      // uaktualnij status robota z free na zajęty
      //robot.status.includes();
      this.robotTaskService.save(this.task).subscribe(
        result => {
          if (this.taskExists(this.task.id)) {
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
      );

     /* this.robot.status = this.robot.status.filter(status=> status.id !== this.robotStatusFree.id);
      console.log("Statusy robota po filtrowaniu: " + JSON.stringify(this.robot.status));*/
      /*this.robotService.update(this.robot).subscribe(
        result => {
          if (this.taskExists(this.task.id)) {
            this.robotsFromDB[ this.robotsFromDB.findIndex(item => item.id == result.id)] = result;
          } else {
            this.robotsFromDB.push(result)
          }
          this.toastr.success("Zaktualizowano robota");
          console.log(result);
        },
        error => {
          this.toastr.error("Wystąpił bład podczas dodawania");
        }
      );*/


    });
  }

  taskExists(id: string) {
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
