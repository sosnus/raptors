import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-creator',
  templateUrl: './task-creator.component.html',
  styleUrls: ['./task-creator.component.css']
})
export class TaskCreatorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  behaviours = [
    'Idź do przodu',
    'Otwórz lodówkę',
    'Podnieś żółty ser',
    'Zamknij lodówkę',
    'Odwróć się',
    'Idź do przodu',
    'Odłóż żółty ser na stół',
    'Zakończ'
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.behaviours, event.previousIndex, event.currentIndex);
    console.log(this.behaviours)
  }
}
