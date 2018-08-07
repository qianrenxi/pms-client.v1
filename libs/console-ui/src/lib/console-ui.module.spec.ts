import { async, TestBed } from '@angular/core/testing';
import { ConsoleUiModule } from './console-ui.module';

describe('ConsoleUiModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [ConsoleUiModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(ConsoleUiModule).toBeDefined();
  });
});
