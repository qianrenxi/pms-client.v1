import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryFolderComponent } from './story-folder.component';

describe('StoryFolderComponent', () => {
  let component: StoryFolderComponent;
  let fixture: ComponentFixture<StoryFolderComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [StoryFolderComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
