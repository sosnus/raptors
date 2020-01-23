import {Component, OnInit} from '@angular/core';
import {RobotTask} from "../../model/Robots/RobotTask";
import {RobotService} from "../../services/robot.service";
import {Robot} from "../../model/Robots/Robot";
import {BehaviourService} from "../../services/type/behaviour.service";
import {Behaviour} from "../../model/Robots/Behaviour";
import {TaskPriorityService} from "../../services/type/task-priority.service";
import {TaskPriority} from "../../model/type/TaskPriority";
import {Task} from "protractor/built/taskScheduler";

@Component({
  selector: 'app-taskpanel',
  templateUrl: './taskpanel.component.html',
  styleUrls: ['./taskpanel.component.css']
})
export class TaskpanelComponent implements OnInit {

  robotTask: RobotTask;

  robots: Robot[];
  availableRobots: Robot[];
  robot: Robot;
  selectedRobot: string;

  behaviour: Behaviour;
  behaviours: Behaviour[];
  selectedBehaviour: string;

  taskPriority: TaskPriority;
  taskPriorities: TaskPriority[];

  constructor(private robotService: RobotService, private behaviourService: BehaviourService, private taskPriorityService: TaskPriorityService) {
    this.robotTask = new RobotTask(null, null, null, null, null, null, null);
  }

  ngOnInit() {
    this.robotService.getRobots().subscribe(
      robot => {
        this.robots = robot;
        this.getAvailableRobots();
      }
    );

    this.behaviourService.getAll().subscribe(
      behaviour => {
        this.behaviours = behaviour;
      }
    );

    this.taskPriorityService.getAll().subscribe(priority => {
        this.taskPriorities = priority;
      }
    );
  }

  getAvailableRobots() {
    this.availableRobots = [];
    this.robots.forEach(robot => {
      if (robot.available) {
        this.availableRobots.push(robot);
      }
    });
    console.log(this.availableRobots);
  }

  selectRobot(id: string) {
    console.log(id);
    this.selectedRobot = id;
  }

  selectBehaviour(id: string) {
    console.log(id);
    this.selectedBehaviour = id;
  }

}
