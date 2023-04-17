/**
 * Copyright 2023 Design Barn Inc.
 */

export const isClassSelector = (selector: string): boolean => {
  const regex = /^\.[A-Z_a-z-][\w-]*$/u;

  return regex.test(selector);
};

export const isIdSelector = (selector: string): boolean => {
  const regex = /^#[A-Z_a-z-][\w-]*$/u;

  return regex.test(selector);
};

export const stripSelectorPrefix = (selector: string): string => {
  if ([isClassSelector(selector), isIdSelector(selector)].includes(true)) {
    return selector.slice(1);
  } else {
    return selector;
  }
};
