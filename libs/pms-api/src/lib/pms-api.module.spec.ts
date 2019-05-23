import { async, TestBed } from '@angular/core/testing';
import { PmsApiModule } from './pms-api.module';

describe('PmsApiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PmsApiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PmsApiModule).toBeDefined();
  });
});
