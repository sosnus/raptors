import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-behaviour',
  templateUrl: './task-behaviour.component.html',
  styleUrls: ['./task-behaviour.component.css']
})

export class TaskBehaviourComponent implements OnInit {
  @Input() title: string;
  @Input() index: number;


  constructor() { }

  ngOnInit() {
  }


}
