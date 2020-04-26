import { TestBed } from '@angular/core/testing';

import { TaskCreatorService } from './task-creator.service';

describe('TaskCreatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskCreatorService = TestBed.get(TaskCreatorService);
    expect(service).toBeTruthy();
  });
});
