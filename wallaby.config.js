module.exports = wallaby => ({
  files: [
    '*.js',
    'src/**/*',
    'test/**/*',
    '!test/**/*.test.js',
  ],

  tests: [
    'test/**/*.test.js',
  ],

  env: {
    type: 'node',
    runner: 'node'
  },

  testFramework: 'ava',

  setup: () => ({require('babel-polyfill'), require.resolve('regenerator-runtime/runtime')}),

  compilers: {
    '**/*.js': wallaby.compilers.babel(),
  },
})
