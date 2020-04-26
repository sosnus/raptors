import { Component, OnInit } from '@angular/core';

import { TaskCreatorService } from 'src/app/services/task-creator.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Observable<[]>

  constructor(private taskCreatorService: TaskCreatorService) {
    this.taskCreatorService.getTasks().subscribe(res => this.tasks = res);
   }

  ngOnInit() {
  }
  
  removeTask(id: Number): void {
    this.taskCreatorService.removeTask(id).subscribe(res => this.tasks = res);
  }
}
