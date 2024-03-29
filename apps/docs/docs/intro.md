---
sidebar_position: 1
---

# Intro

This guide will assist you in understanding how to theme and style your Lottie animations using our innovative tool:
Lottie Style Sheets (LSS). The LSS specs allow you to seamlessly adapt the look and feel of your animations, much like
CSS does for HTML elements.

## Overview

Lottie Theming was designed to revolutionize the way designers and developers interact with Lottie animations. The tool
introduces LSS, a powerful means of customizing and theming animations. It leverages the simplicity and flexibility of
CSS syntax to modify properties of animations, including colors, stroke widths, gradients, and more, while ensuring the
animations remain lightweight and high-performing.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) version 18 or above
- [npm](https://www.npmjs.com/get-npm) version 6 or above

## Usage

```bash
npm install @lottiefiles/relottie
npm install @lottiefiles/lottie-style
```

```js
import style from '@lottiefiles/relottie-style';
import {relottie} from '@lottiefiles/relottie';
import lottie from './lottie.json';

const lss = `
    #my-fill-shape {
        fill-color: red;
    }
`;

relottie()
  .use(style, {
    lss,
  })
  .process(JSON.stringify(lottieJSON))
  .then(({ value }) => {
    const styledLottie = JSON.parse(value);
  });
```
