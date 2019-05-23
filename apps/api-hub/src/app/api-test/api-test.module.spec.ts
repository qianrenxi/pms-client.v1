import { ApiTestModule } from './api-test.module';

describe('ApiTestModule', () => {
  let apiTestModule: ApiTestModule;

  beforeEach(() => {
    apiTestModule = new ApiTestModule();
  });

  it('should create an instance', () => {
    expect(apiTestModule).toBeTruthy();
  });
});
