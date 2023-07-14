# Lottie Styler

Lottie Theming was designed to revolutionize the way designers and developers interact with Lottie animations. The tool
introduces LSS, a powerful means of customizing and theming animations. It leverages the simplicity and flexibility of
CSS syntax to modify properties of animations, including colors, stroke widths, gradients, and more, while ensuring the
animations remain lightweight and high-performing.

# Intro

This guide will assist you in understanding how to theme and style your Lottie animations using our innovative tool:
Lottie Style Sheets (LSS). The LSS specs allow you to seamlessly adapt the look and feel of your animations, much like
CSS does for HTML elements.

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

## Properties

### fill-color

The `fill-color` property in Lottie Style Sheets (LSS) defines the color of a `FillShape` or `GradientFillShape`. You can specify the color in any valid CSS color format, such as hex codes, RGB(), or color names.

Here's how you can use the fill-color property:

#### For `FillShape`

```css
FillShape {
    fill-color: red;
}
```
In this example, all shapes of type `FillShape` will be filled with red color.

#### For `GradientFillShape`

You can use both linear and radial gradients for `GradientFillShape`. Here's an example:

```css
GradientFillShape {
    fill-color: linear-gradient(red, blue);
}
```

In this example, the `GradientFillShape` will have a linear gradient fill starting with red and ending with blue.

```css
GradientFillShape {
    fill-color: radial-gradient(circle, yellow, green);
}
```

In this example, the `GradientFillShape` will have a radial gradient fill starting with yellow at the center and ending with green at the edges.


#### Linear Gradient Color Value

The `linear-gradient()` function for `fill-color` property in `GradientFillShape` creates a linear gradient with color transitions along a straight line. This line is defined by an angle or a direction (to top, to right, to bottom left, etc.). However, in Lottie Style Sheets, the gradient line is always horizontal, starting from the left (0%) to the right (100%).

The `linear-gradient()` function takes multiple color-stop arguments where you specify a color and its position along the gradient line. The position is usually defined by a percentage. For example:

```css
GradientFillShape {
    fill-color: linear-gradient(red 20%, blue 80%);
}
```

In this example, the gradient starts with red at 20% from the left and transitions to blue starting from 80% to the end of the `GradientFillShape`. The area between 20% and 80% will be a transition from red to blue.


#### Radial Gradient Color Value

The `radial-gradient()` function for fill-color property in `GradientFillShape` creates a radial gradient with color transitions radiating from a certain point. By default, this point is the center of the element.

The `radial-gradient()` function, similar to `linear-gradient()`, takes multiple color-stop arguments where you specify a color and its position along the gradient radius. The position is usually defined by a percentage. For example:


```css
GradientFillShape {
    fill-color: radial-gradient(yellow 20%, green 80%);
}
```

In this example, the gradient starts with yellow at 20% from the center and transitions to green starting from 80% to the edge of the `GradientFillShape`. The area between 20% and 80% will be a transition from yellow to green.

### opacity

The `opacity` property in Lottie Style Sheets (LSS) sets the transparency level of a layer or shape. The value can range between 0.0 (fully transparent) and 1.0 (fully opaque). 

In addition to decimal values, the `opacity` property also accepts percentage values, much like in CSS. Therefore, you can also set the opacity from 0% (fully transparent) to 100% (fully opaque).

Here's how you can use the opacity property:

```css
SolidColorLayer {
    opacity: 0.5;
}
```

In this example, the `SolidColorLayer` will have 50% transparency (or 50% opacity).

Or, using percentage:

```css
SolidColorLayer {
    opacity: 50%;
}
```

This example is equivalent to the previous one. The `SolidColorLayer` will again have 50% transparency (or 50% opacity). Note that in LSS, "0.5" and "50%" are considered equivalent values for opacity.

### src

The `src` property specifies the URL of an image asset. 

```css
ImageLayer {
    src: url('https://example.com/image.png');
}
```

In this example, the `ImageLayer` will use an image located at the specified URL. Please note that the URL must be fully qualified and publicly accessible.

### stroke-color

The `stroke-color` property in LSS defines the color of a `StrokeShape` or `GradientStrokeShape`. You can specify the color in any valid CSS color format.

Here's how you can use the stroke-color property:

#### For `StrokeShape`

```css
StrokeShape {
    stroke-color: red;
}
```
In this example, the `StrokeShape` will be stroked with red color.

#### For `GradientStrokeShape`

You can use both linear and radial gradients:

```css
GradientStrokeShape {
    stroke-color: linear-gradient(red, blue);
}
```
In this example, the `GradientStrokeShape` will have a linear gradient stroke starting with red and transitioning to blue.

```css
GradientStrokeShape {
    stroke-color: radial-gradient(yellow, green);
}
```
In this example, the `GradientStrokeShape` will have a radial gradient stroke starting with yellow and transitioning to green.


#### Linear Gradient Color Value

The `linear-gradient()` function creates a linear gradient with color transitions along a straight line. This line is defined by an angle or a direction (to top, to right, to bottom left, etc.). However, in Lottie Style Sheets, the gradient line is always horizontal, starting from the left (0%) to the right (100%).

The `linear-gradient()` function takes multiple color-stop arguments where you specify a color and its position along the gradient line. The position is usually defined by a percentage.

Here's an example:

```css
GradientStrokeShape {
    stroke-color: linear-gradient(red 20%, blue 80%);
}
```

In this example, the gradient stroke starts with red at 20% from the left and transitions to blue starting from 80% to the end of the `GradientStrokeShape`. The area between 20% and 80% will be a transition from red to blue.

#### Radial Gradient Color Value

The `radial-gradient()` function creates a radial gradient with color transitions radiating from a certain point. By default, this point is the center of the element.

The `radial-gradient()` function, similar to `linear-gradient()`, takes multiple color-stop arguments where you specify a color and its position along the gradient radius. The position is usually defined by a percentage.

Here's an example:

```css
GradientStrokeShape {
    stroke-color: radial-gradient(yellow 20%, green 80%);
}
```

In this example, the gradient stroke starts with yellow at 20% from the center and transitions to green starting from 80% to the edge of the `GradientStrokeShape`. The area between 20% and 80% will be a transition from yellow to green.

Remember, the `stroke-color` property allows you to be creative and explore various color combinations using gradients to create visually appealing animations.

### stroke-width

The `stroke-width` property in LSS specifies the width of the stroke on `StrokeShape` and `GradientStrokeShape`. You can provide a numeric value representing the stroke width in pixels.

Here's how you can use the stroke-width property:

#### For `StrokeShape`

```css
StrokeShape {
    stroke-width: 5;
}
```
In this example, the `StrokeShape` will have a stroke width of 5 pixels.

#### For `GradientStrokeShape`

```css
GradientStrokeShape {
    stroke-width: 10;
}
```
In this example, the `GradientStrokeShape` will have a stroke width of 10 pixels.

### visibility

The `visibility` property in LSS controls whether a layer or shape is visible or not. The default value for visibility is 'visible'. If you wish to hide a layer or shape, set its visibility to 'hidden'.

Here's an example of how to use the visibility property:

```css 
#my-layer {
    visibility: hidden;
}
```
In this example, the layer with the ID 'my-layer' will be hidden.


### Selectors

Selectors in Lottie Style Sheets (LSS) are used to target specific layers or shapes for styling. They can be broken down into four categories: ID, Class, Type, and Attribute selectors. 

### ID Selector

An ID selector targets a layer or shape based on its ID. To style a shape or layer, assign it an ID and then style it using this ID. Here's an example of how to use the ID selector:

```css
#my-fill-shape {
    fill-color: red;
}
```
In this example, the shape with the ID 'my-fill-shape' is filled with red color.

### Class Selector

A class selector targets a layer or shape based on its class. To use a class selector, assign a class to a layer or shape and style it using this class. Here's an example:

```css
.my-shape {
    fill-color: red;
}
```
In this example, all shapes with the class 'my-shape' will be filled with red color.

### Type Selector

A type selector targets a layer or shape based on its type. Supported types in LSS include `FillShape`, `StrokeShape`, `SolidColorLayer`, `ImageLayer`, `GradientFillShape`, and `GradientStrokeShape`. Here's how you can use the type selector:

```css
FillShape {
    fill-color: red;
}
```
In this example, all shapes of type `FillShape` will be filled with red color.

### Attribute Selector

An attribute selector targets a layer or shape based on an attribute. Supported attributes include `name`, `id`, and `class`. Here's an example of how to use an attribute selector:

```css
[name="my-fill-shape"] {
    fill-color: red;
}
```
In this example, all shapes with the attribute name equal to 'my-fill-shape' will be filled with red color.

## Contributing

We use changesets to maintain a changelog for this repository. When making any changes to the codebase that impact functionality or performance, we require a changeset to be present.

To add a changeset, run:

```
pnpm changeset add
```

And select the type of version bump you'd like (major, minor, patch).

You can document the changes in detail and format them properly using Markdown by opening the ".md" file that the "pnpm changeset" command created in the ".changeset" folder. Open the file, and it should look something like this:

```
---
"@dotlottie/common": minor
"@dotlottie/react-player": major
---

This is where you document your **changes** using Markdown.

- You can write
- However you'd like
- In as much detail as you'd like

Aim to provide enough details so that teammates and future you can understand the changes and the context of

 the change.
```

Commit your changes and the changeset to your branch, and then create a pull request on the develop branch.

## Our Other Lottie-related Libraries

Here are some of our other Lottie-related libraries:

- [dotlottie-js](https://github.com/dotlottie/dotlottie-js): Creation tool for dotLottie animations
- [dotlottie](https://github.com/dotlottie/player-component): dotLottie animation players
- [lottie-player](https://github.com/LottieFiles/lottie-player): A web component for the Lottie Web player.
- [lottie-react](https://github.com/LottieFiles/lottie-react): A React component for the Lottie Web player.
- [lottie-vue](https://github.com/LottieFiles/lottie-vue): A Vue component for the Lottie player.
- [svelte-lottie-player](https://github.com/LottieFiles/svelte-lottie-player): Lottie player component for use with Svelte.
- [jLottie](https://github.com/LottieFiles/jlottie): jLottie is suitable as a general-purpose Lottie player, though it implements a subset of the features in the core player. This approach leads to a tiny footprint and great performance.
- [lottie-interactivity](https://github.com/LottieFiles/lottie-interactivity): This is a small library to add scrolling, cursor interactivity, and interaction chaining to your Lottie animations.
- [lottie-js](https://github.com/LottieFiles/lottie-js): The library consists of methods to map the Lottie JSON to the object model and interact with properties, as well as manipulate them.

## License

MIT License © LottieFiles.com