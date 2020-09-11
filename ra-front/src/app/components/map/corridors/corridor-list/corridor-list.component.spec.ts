import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridorListComponent } from './corridor-list.component';

xdescribe('CorridorListComponent', () => {
  let component: CorridorListComponent;
  let fixture: ComponentFixture<CorridorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorridorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorridorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
