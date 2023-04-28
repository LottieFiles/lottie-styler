/**
 * Copyright 2023 Design Barn Inc.
 */

import { relottie } from '@lottiefiles/relottie';

import style from '../dist';

import bounce from './__fixtures__/bounce.json';
import check from './__fixtures__/check.json';
import solid from './__fixtures__/solid.json';

test('styling fill shape', async () => {
  const vfile = await relottie()
    .use(style, {
      lss: `
      .background {
        fill-color: blue;
        fill-rule: evenodd;
        opacity: 0.5;
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
        opacity: 0.5;
      }
  `,
    })
    .process(JSON.stringify(check));

  expect(vfile.value).toMatchSnapshot();
});

test('styling solid layer', async () => {
  const vfile = await relottie()
    .use(style, {
      lss: `
      .solid {
        solid-color: red;
      }
  `,
    })
    .process(JSON.stringify(solid));

  expect(vfile.value).toMatchSnapshot();
});
