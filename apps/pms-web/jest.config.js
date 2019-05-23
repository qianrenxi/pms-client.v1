module.exports = {
  name: 'pms-web',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/pms-web/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
