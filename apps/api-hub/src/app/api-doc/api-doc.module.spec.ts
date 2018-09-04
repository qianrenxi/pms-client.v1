import { ApiDocModule } from './api-doc.module';

describe('ApiDocModule', () => {
  let apiDocModule: ApiDocModule;

  beforeEach(() => {
    apiDocModule = new ApiDocModule();
  });

  it('should create an instance', () => {
    expect(apiDocModule).toBeTruthy();
  });
});
