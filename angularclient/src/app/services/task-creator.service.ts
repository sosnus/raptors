import { Injectable } from '@angular/core';
import { TASKS } from '../components/task-creator-panel/local_db'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskCreatorService {
  tasks: Observable<any>;

  constructor() {
    this.tasks = of(TASKS);
  }

  getTasks(): Observable<any> {
    return this.tasks;
  }

  removeTask(id: Number): Observable<any> {
    console.log("Removing Task with ID: " + id);
    let arr = [];

    this.tasks.forEach(t => {
      t.forEach(tt => {
        if(tt.id !== id) {
          arr.push(tt)
        }
      })
    })

    this.tasks = of(arr);

    return of(arr);
  }
}
