import { Component, OnInit } from '@angular/core';

import { TASKS } from '../local_db'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks = TASKS;

  constructor() { }

  ngOnInit() {
  }
  
  removeTask(id: Number): void {
    console.log("Removing task with ID: " + id);
  }
}
