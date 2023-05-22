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
      FillShape[class=background] {
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
      ShapeLayer StrokeShape.stroke1 {
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
      SolidColorLayer.solid {
        fill-color: red;
      }
  `,
    })
    .process(JSON.stringify(solid));

  expect(vfile.value).toMatchSnapshot();
});

test('element selector', async () => {
  const vfile = await relottie()
    .use(style, {
      lss: `
      SolidColorLayer {
        fill-color: blue;
      }

      GradientFillShape {
        visibility: hidden;
      }

      GradientStrokeShape {
        visibility: hidden;
        stroke-color: linear-gradient(red, green, blue);
      }

      StrokeShape {
        stroke-color: blue;
        stroke-width: 50;
        opacity: 0.5;
      }

      FillShape {
        fill-color: green;
        fill-rule: evenodd;
        opacity: 0.5;
      }

      ImageLayer {
        visibility: hidden;
      }
    `,
    })
    .process(JSON.stringify(solid));

  expect(vfile.value).toMatchSnapshot();
});

test('attribute selector', async () => {
  const vfile = await relottie()
    .use(style, {
      lss: `
      [class=solid] {
        fill-color: red;
      }

      [name=Sea Layer] FillShape {
        fill-color: red;
      }
    `,
    })
    .process(JSON.stringify(solid));

  expect(vfile.value).toMatchSnapshot();
});

test('styling image layer', async () => {
  const vfile = await relottie()
    .use(style, {
      lss: `
      ImageLayer {
        src: url("https://placehold.co/600x400")
      }
    `,
    })
    .process(JSON.stringify(solid));

  expect(vfile.value).toMatchSnapshot();
});
