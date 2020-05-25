import {Component, Input, OnInit} from '@angular/core';
import {LogService} from "../../../services/log.service";

@Component({
  selector: 'app-logs-table',
  templateUrl: './logs-table.component.html',
  styleUrls: ['./logs-table.component.css']
})
export class LogsTableComponent implements OnInit {

  @Input()
  logs = [];

  constructor() {
  }

  ngOnInit() {
  }

}
