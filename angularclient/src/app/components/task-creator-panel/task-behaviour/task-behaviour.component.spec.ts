import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskBehaviourComponent } from './task-behaviour.component';

describe('TaskBehaviourComponent', () => {
  let component: TaskBehaviourComponent;
  let fixture: ComponentFixture<TaskBehaviourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskBehaviourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskBehaviourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
