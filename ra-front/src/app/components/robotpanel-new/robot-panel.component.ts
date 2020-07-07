import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RobotService } from "../../services/robot.service";
import { Robot } from "../../model/Robots/Robot";
import { LogService } from "../../services/log.service";
import { Log } from "../../model/Robots/Log";
import { PropertyAssembler } from "../../model/GenericRobotModel/PropertyAssembler";
import { Property } from "../../model/GenericRobotModel/Property";
import { SpecialProperty } from "../../model/GenericRobotModel/SpecialProperty/SpecialProperty";

@Component({
  selector: 'app-robot-panel',
  templateUrl: './robot-panel.component.html',
  styleUrls: ['./robot-panel.component.css']
})
export class RobotPanelComponentNew implements OnInit {

  private robot: Robot = new Robot();
  private logs: Log[] = [];
  private genericModel: Property;
  private specialProperties: Array<SpecialProperty>;
  private rootName: string;
  private rootProperties;

  constructor(private activatedRoute: ActivatedRoute,
    private robotService: RobotService,
    private logService: LogService) {
  }

  private refreshStatus() {
    this.getRobotData(this.activatedRoute.params['id']);
  }

  private fetchIDfromRoute() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.getRobotData(id);
      this.getGenericRobotModel(id);
    });
  }

  private getRobotData(id) {
    this.robotService.getByID(id).subscribe(data => {
      this.robot = data;
      this.getLogs();
    });
  }

  private getGenericRobotModel(id) {
    this.robotService.getRawByID(id).subscribe(data => {
      const assembler = new PropertyAssembler('Model', data);
      const genericModel = assembler.rootProperty;
      this.specialProperties = assembler.specialProperties;
      this.genericModel = genericModel;
      this.rootName = genericModel.name;
      this.rootProperties = genericModel.getValue();
    });
  }

  private getLogs() {
    this.logService.getLogsFromRobot(this.robot.id).subscribe(logs => {
      this.logs = logs.slice(-5);
    });
  }

  ngOnInit() {
    this.fetchIDfromRoute();
  }

}
