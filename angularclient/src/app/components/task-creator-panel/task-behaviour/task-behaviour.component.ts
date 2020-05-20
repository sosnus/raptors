import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-behaviour',
  templateUrl: './task-behaviour.component.html',
  styleUrls: ['./task-behaviour.component.css']
})

export class TaskBehaviourComponent implements OnInit {
  modalID="taskBehaviourEditModal";

  constructor() { }

  ngOnInit() {
  }

  reset(){
    console.log("reset");
  }

  update(){
    console.log("update");
    
  }
}
