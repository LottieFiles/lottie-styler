# relottie-style

`relottie-style` is a plugin from the lottie-styler suite, integrating with relottie. It empowers developers with a "CSS-in-JS" inspired approach, enabling dynamic customization and theming of Lottie animations via Lottie Style Sheets (LSS).

## Features

- CSS-in-JS inspired approach for Lottie animations.
- Easy integration with relottie.
- Support for a variety of Lottie properties.

## Pre-requisites

- [relottie](https://github.com/LottieFiles/relottie)
- [Node.js](https://nodejs.org/en/) v18.0.0 or higher

## Installation

```sh
npm install @lottiefiles/relottie
npm install @lottiefiles/relottie-style
```

## Usage

```js
import style from '@lottiefiles/relottie-style';
import {relottie} from '@lottiefiles/relottie';
import lottie from './lottie.json';

const lss = {
    "SolidColorLayer": {
        "fill-color": "blue"
    },
    //... more styles
};

relottie()
  .use(style, { lss })
  .process(JSON.stringify(lottieJSON))
  .then(({ value }) => {
    const styledLottieJSON = JSON.parse(value);
  });
```

## Lottie Style Sheets (LSS)

### Supported Selectors

Lottie Style Sheets use selectors to target specific layers or shapes for styling. Here are the primary selector categories:

#### 1. ID Selector

Targets layers or shapes by their ID.

```json
"#my-fill-shape" : {
    "fill-color": "red"
}
```

#### 2. Class Selector

Targets layers or shapes by their class.

```json
".my-shape": {
    "fill-color": "red"
}
```

#### 3. Type Selector

Targets layers or shapes by their type. Supported types are `FillShape`, `StrokeShape`, `SolidColorLayer`, `ImageLayer`, `GradientFillShape`, and `GradientStrokeShape`.

```json
"FillShape": {
    "fill-color": "red"
}
```

#### 4. Attribute Selector

Targets layers or shapes by their attributes like `name`, `id`, and `class`.

```json
"[name="my-fill-shape"]": {
    "fill-color": "red"
}
```

### Supported Properties

- **fill-color:** Defines the color of a `FillShape`, `SolidColorLayer` or similar in standard CSS format.
- **fill-rule:** Determines the fill rule for a shape (e.g., `evenodd`).
- **opacity:** Adjusts transparency, ranging from 0.0 (transparent) to 1.0 (opaque).
- **stroke-color:** Sets the color of a `StrokeShape` or similar. Supports plain colors or linear/radial gradients (e.g., `linear-gradient(red, green, blue)`).
- **stroke-width:** Denotes the stroke width.
- **visibility:** Toggles visibility ('visible' by default, 'hidden' to hide).
- **src:** Specifies the URL of an image asset, typically used with `ImageLayer`.

## Contributing

We employ changesets for our changelog. When making amendments, include a changeset:

```
pnpm changeset add
```

Then commit and initiate a pull request.
