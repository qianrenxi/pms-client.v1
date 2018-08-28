import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskGantListComponent } from './task-gant-list.component';

describe('TaskGantListComponent', () => {
  let component: TaskGantListComponent;
  let fixture: ComponentFixture<TaskGantListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskGantListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskGantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
