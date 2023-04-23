/**
 * Copyright 2023 Design Barn Inc.
 */

import parse from '@lottiefiles/relottie-parse';
import stringify from '@lottiefiles/relottie-stringify';
import { unified } from 'unified';

import style from '../dist';

import bounce from './__fixtures__/bounce.json';
import styles from './__fixtures__/styles.lss';

test('style', async () => {
  const vfile = await unified()
    .use(parse)
    .use(style, {
      lss: styles,
    })
    .use(stringify)
    .process(JSON.stringify(bounce));

  expect(vfile.value).toMatchSnapshot();
});
