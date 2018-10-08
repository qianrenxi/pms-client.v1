import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDrop2Component } from './drag-drop2.component';

describe('DragDrop2Component', () => {
  let component: DragDrop2Component;
  let fixture: ComponentFixture<DragDrop2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragDrop2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDrop2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
