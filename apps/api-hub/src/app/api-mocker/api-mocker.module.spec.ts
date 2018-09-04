import { ApiMockerModule } from './api-mocker.module';

describe('ApiMockerModule', () => {
  let apiMockerModule: ApiMockerModule;

  beforeEach(() => {
    apiMockerModule = new ApiMockerModule();
  });

  it('should create an instance', () => {
    expect(apiMockerModule).toBeTruthy();
  });
});
