/**
 * Copyright 2023 Design Barn Inc.
 */

import { isLinearGradient, isRadialGradient, normalizeGradient } from '../dist/gradient';

describe('linear gradient color value', () => {
  const validCases = [
    {
      value: 'linear-gradient(red, black, blue)',
      expected: [0, 1, 0, 0, 0.5, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0.5, 1, 1, 1],
    },
    {
      value: 'linear-gradient(rgba(255, 0, 0, 1) 10%, black 20%, blue 30%)',
      expected: [0.1, 1, 0, 0, 0.2, 0, 0, 0, 0.3, 0, 0, 1, 0.1, 1, 0.2, 1, 0.3, 1],
    },
    {
      value: 'linear-gradient(rgba(255, 255, 0, 0.2) 10%, #000 20%, blue 30%)',
      expected: [0.1, 1, 1, 0, 0.2, 0, 0, 0, 0.3, 0, 0, 1, 0.1, 0.2, 0.2, 1, 0.3, 1],
    },
    {
      value: 'linear-gradient(red 10%, rgb(0, 0, 0) 50%, #0000FF 100%)',
      expected: [0.1, 1, 0, 0, 0.5, 0, 0, 0, 1, 0, 0, 0, 0.1, 1, 0.5, 1, 1, 1],
    },
  ];

  test.each(validCases)('%p -> valid', ({ expected, value }) => {
    expect(normalizeGradient(value)).toEqual(expected);
  });

  const invalidCases = ['radial-gradient(#FEFEFE 10%, blue 20%, green)'];

  test.each(invalidCases)('%p -> invalid', (value) => {
    expect(isLinearGradient(value)).toBe(false);
  });
});

describe('radial gradient color value', () => {
  const validCases = [
    {
      value: 'radial-gradient(red, black, blue)',
      expected: [0, 1, 0, 0, 0.5, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0.5, 1, 1, 1],
    },
    {
      value: 'radial-gradient(rgba(255, 0, 0, 1) 10%, black 20%, blue 30%)',
      expected: [0.1, 1, 0, 0, 0.2, 0, 0, 0, 0.3, 0, 0, 1, 0.1, 1, 0.2, 1, 0.3, 1],
    },
    {
      value: 'radial-gradient(rgba(255, 255, 0, 0.2) 10%, #000 20%, blue 30%)',
      expected: [0.1, 1, 1, 0, 0.2, 0, 0, 0, 0.3, 0, 0, 1, 0.1, 0.2, 0.2, 1, 0.3, 1],
    },
    {
      value: 'radial-gradient(red 10%, rgb(0, 0, 0) 50%, #0000FF 100%)',
      expected: [0.1, 1, 0, 0, 0.5, 0, 0, 0, 1, 0, 0, 0, 0.1, 1, 0.5, 1, 1, 1],
    },
  ];

  test.each(validCases)('%p -> valid', ({ expected, value }) => {
    expect(isRadialGradient(value)).toBe(true);
    expect(normalizeGradient(value)).toEqual(expected);
  });

  const invalidCases = ['linear-gradient(#FEFEFE 10%, blue 20%, green 30%)'];

  test.each(invalidCases)('%p -> invalid', (value) => {
    expect(isRadialGradient(value)).toBe(false);
  });
});
