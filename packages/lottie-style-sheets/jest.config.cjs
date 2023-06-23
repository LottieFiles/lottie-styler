/**
 * Copyright 2023 Design Barn Inc.
 */

const path = require('path');

const { createConfig } = require('@lottiefiles/jest-config');

const { name: displayName } = require('./package.json');

module.exports = createConfig({
  displayName,

  globals: {
    'ts-jest': {
      useESM: true,
    },
  },

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  transformIgnorePatterns: ['/node_modules/'],

  transformFormat: 'esm',
  transformTarget: 'es2020',
  transform: {
    '\\.(lss)$': path.resolve('./jest/transformers/lss.cjs'),
  },
});
