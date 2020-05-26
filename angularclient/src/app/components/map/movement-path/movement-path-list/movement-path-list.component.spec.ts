import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementPathListComponent } from './movement-path-list.component';

xdescribe('MovementPathListComponent', () => {
  let component: MovementPathListComponent;
  let fixture: ComponentFixture<MovementPathListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementPathListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementPathListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
