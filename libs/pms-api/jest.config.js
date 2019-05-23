module.exports = {
  name: 'pms-api',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/pms-api',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
