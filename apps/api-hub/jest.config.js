module.exports = {
  name: 'api-hub',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/api-hub/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
