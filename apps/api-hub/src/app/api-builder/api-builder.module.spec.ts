import { ApiBuilderModule } from './api-builder.module';

describe('ApiBuilderModule', () => {
  let apiBuilderModule: ApiBuilderModule;

  beforeEach(() => {
    apiBuilderModule = new ApiBuilderModule();
  });

  it('should create an instance', () => {
    expect(apiBuilderModule).toBeTruthy();
  });
});
