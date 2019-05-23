import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiBuilderMainComponent } from './api-builder-main.component';

describe('ApiBuilderMainComponent', () => {
  let component: ApiBuilderMainComponent;
  let fixture: ComponentFixture<ApiBuilderMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiBuilderMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiBuilderMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
