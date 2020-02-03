import { Component, OnInit } from '@angular/core';
import {TaskPriority} from "../../../../model/type/TaskPriority";
import {ToastrService} from "ngx-toastr";
import {TaskPriorityService} from "../../../../services/type/task-priority.service";

@Component({
  selector: 'app-task-priorities',
  templateUrl: './task-priorities.component.html',
  styleUrls: ['./task-priorities.component.css']
})
export class TaskPrioritiesComponent implements OnInit {
  taskPriorities: TaskPriority[] = [];
  taskPriority: TaskPriority = new TaskPriority(null, null);
  modalID = "taskPriorityModal";

  constructor(private taskPriorityService: TaskPriorityService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getTaskPriorities();
  }

  getTaskPriorities() {
    this.taskPriorityService.getAll().subscribe(
      data => this.taskPriorities = data
    )
  }

  reset(){
    this.taskPriority = new TaskPriority(null, null);
  }

  createOrUpdate() {
    this.taskPriorityService.save(this.taskPriority).subscribe(
      result => {
        if (this.typeExists(this.taskPriority.id)) {
          this.taskPriorities[this.taskPriorities.findIndex(item => item.id == result.id)] = result;
        } else {
          this.taskPriorities.push(result)
        }
        this.taskPriority = new TaskPriority(null, null);
        this.toastr.success("Dodano lub edytowano pomyślnie");
      },
      error => {
        this.toastr.error("Wystąpił bład podczas dodawania lub edycji");
      }
    )
  }

  typeExists(id: string) {
    return this.taskPriorities.some(item => item.id == id);
  }

  edit(taskPriority: TaskPriority) {
    Object.assign(this.taskPriority, taskPriority)
  }

  delete(taskPriority: TaskPriority) {
    this.taskPriorityService.delete(taskPriority).subscribe(
      result => {
        this.taskPriorities = this.taskPriorities.filter(item => item != taskPriority)
        this.toastr.success("Usunięto pomyślnie");
        this.taskPriority = new TaskPriority(null,null);
      },
      error => {
        this.toastr.error("Wystąpił błąd podczas usuwania");
      }
    )
  }


}
