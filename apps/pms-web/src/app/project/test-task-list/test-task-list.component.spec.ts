import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTaskListComponent } from './test-task-list.component';

describe('TestTaskListComponent', () => {
  let component: TestTaskListComponent;
  let fixture: ComponentFixture<TestTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
