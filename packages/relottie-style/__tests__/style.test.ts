/**
 * Copyright 2023 Design Barn Inc.
 */

import { relottie } from '@lottiefiles/relottie';

import style from '../dist';

import bounce from './__fixtures__/bounce.json';
import check from './__fixtures__/check.json';

test('styling fill shape', async () => {
  const vfile = await relottie()
    .use(style, {
      lss: `
      .background {
        fill-color: blue;
      }
    `,
    })
    .process(JSON.stringify(bounce));

  expect(vfile.value).toMatchSnapshot();
});

test('styling stroke shape', async () => {
  const vfile = await relottie()
    .use(style, {
      lss: `
      .stroke1 {
        stroke-color: red;
        stroke-width: 50;
      }
  `,
    })
    .process(JSON.stringify(check));

  expect(vfile.value).toMatchSnapshot();
});
