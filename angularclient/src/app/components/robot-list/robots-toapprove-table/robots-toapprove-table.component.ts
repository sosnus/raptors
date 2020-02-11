import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {RobotToApprove} from "../../../model/Robots/RobotToApprove";
import {RobotaApprovalService} from "../../../services/robotapproval.service";

@Component({
  selector: 'app-robots-toapprove-table',
  templateUrl: './robots-toapprove-table.component.html',
  styleUrls: ['./robots-toapprove-table.component.css']
})
export class RobotsToApproveTableComponent implements OnInit {

  robotsToApprove: RobotToApprove[] = [];
  robotToApprove: RobotToApprove = new RobotToApprove();
  modalID = "robotApprovalModal";

  @Output()
  robotApproved: EventEmitter<boolean> = new EventEmitter();

  ready: boolean = false;

  constructor(private robotaApprovalService: RobotaApprovalService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getRobotsToApprove();
  }

  getRobotsToApprove() {
    this.robotaApprovalService.getAll().subscribe(
      data => {
        this.robotsToApprove = data;
        this.ready = true;
      }
    )
  }

  approveRobot(robotToApprove: RobotToApprove) {
    this.ready = false;
    this.robotaApprovalService.approve(robotToApprove).subscribe(
      result => {
        this.toastr.success("Robot zatwierdzony i dodany do bazy");
        this.getRobotsToApprove();
        this.robotApproved.emit();
        this.ready = true;
      },
      error => {
        this.toastr.error('Wystąpił błąd: ' + error.message);
        this.ready = true;
      });
  }

}
