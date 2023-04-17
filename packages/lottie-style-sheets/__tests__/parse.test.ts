/**
 * Copyright 2023 Design Barn Inc.
 */

import { parse } from '..';

import styles from './__fixtures__/styles.lss';

test('parse', () => {
  expect(parse(styles)).toMatchSnapshot();
});
