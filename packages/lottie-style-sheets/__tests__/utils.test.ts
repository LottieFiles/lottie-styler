/**
 * Copyright 2023 Design Barn Inc.
 */

import { isClassSelector, isIdSelector, stripSelectorPrefix } from '../dist/utils';

test.each([
  ['.my-class', true],
  ['.my_class', true],
  ['.my-class-123', true],
  ['.1st-class', false],
  ['.my class', false],
  ['my-class', false],
  ['.', false],
  ['', false],
])('isClassSelector(%s) returns %p', (selector, expected) => {
  expect(isClassSelector(selector)).toBe(expected);
});

test.each([
  ['#my-id', true],
  ['#my_id', true],
  ['#my-id-123', true],
  ['#1st-id', false],
  ['#my id', false],
  ['my-id', false],
  ['#', false],
  ['', false],
])('isIdSelector(%s) returns %p', (selector, expected) => {
  expect(isIdSelector(selector)).toBe(expected);
});

describe('stripSelectorPrefix', () => {
  test.each([
    ['.my-class', 'my-class'],
    ['.my_class', 'my_class'],
    ['.my-class-123', 'my-class-123'],
  ])('should strip the leading . character from class selectors', (input, expected) => {
    expect(stripSelectorPrefix(input)).toBe(expected);
  });

  test.each([
    ['#my-id', 'my-id'],
    ['#my_id', 'my_id'],
    ['#my-id-123', 'my-id-123'],
  ])('should strip the leading # character from ID selectors', (input, expected) => {
    expect(stripSelectorPrefix(input)).toBe(expected);
  });

  test.each([
    ['layer', 'layer'],
    ['shape', 'shape'],
    ['layer > shape', 'layer > shape'],
  ])('should return the input string for selectors without a leading . or # character', (input, expected) => {
    expect(stripSelectorPrefix(input)).toBe(expected);
  });
});
