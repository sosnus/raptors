import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-task-behaviour-modal',
  templateUrl: './task-behaviour-modal.component.html',
  styleUrls: ['./task-behaviour-modal.component.css']
})
export class TaskBehaviourModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
