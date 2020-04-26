import { Component, OnInit, Input } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { TaskBehaviourModalComponent } from '../task-behaviour-modal/task-behaviour-modal.component';

@Component({
  selector: 'app-task-behaviour',
  templateUrl: './task-behaviour.component.html',
  styleUrls: ['./task-behaviour.component.css']
})
export class TaskBehaviourComponent implements OnInit {
  @Input() title: string

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    alert("EDIT YOUT BEHAVIOR");
    this.dialog.open(TaskBehaviourModalComponent, {
      data: {
        title: 'Behaviour'
      }
    });
  }

}
