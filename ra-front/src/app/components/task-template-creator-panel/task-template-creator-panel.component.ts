import { Component, OnInit } from '@angular/core';

import {StoreService} from '../../services/store.service';
import {TaskTemplateService} from '../../services/taskTemplate.service';

@Component({
  selector: 'app-task-template-creator-panel',
  templateUrl: './task-template-creator-panel.component.html',
  styleUrls: ['./task-template-creator-panel.component.css']
})
export class TaskTemplateCreatorPanelComponent implements OnInit {

  constructor(private storeService: StoreService,
              private taskTemplateService: TaskTemplateService) { }

  ngOnInit() {
    this.taskTemplateService.getRobotTasks().subscribe(tasks => {
      this.storeService.taskTemplateList = tasks;
    });
  }
  
}
