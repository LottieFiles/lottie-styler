/**
 * Copyright 2023 Design Barn Inc.
 */

const { defineConfig } = require('tsup');

module.exports = defineConfig({
  bundle: true,
  clean: true,
  dts: true,
  entry: ['./src/*.ts'],
  format: ['esm'],
  metafile: false,
  minify: true,
  outDir: 'dist',
  platform: 'node',
  sourcemap: true,
  splitting: false,
  target: ['es2020', 'node18'],
  tsconfig: 'tsconfig.build.json',
  noExternal: ['@lottiefiles/relottie'],
});
