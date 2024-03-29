# fill-color

The `fill-color` property in Lottie Style Sheets (LSS) defines the color of a `FillShape` or `GradientFillShape`. You can specify the color in any valid CSS color format, such as hex codes, RGB(), or color names.

Here's how you can use the fill-color property:

## For `FillShape`

```css
FillShape {
    fill-color: red;
}
```
In this example, all shapes of type `FillShape` will be filled with red color.

## For `GradientFillShape`

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


### Linear Gradient Color Value

The `linear-gradient()` function for `fill-color` property in `GradientFillShape` creates a linear gradient with color transitions along a straight line. This line is defined by an angle or a direction (to top, to right, to bottom left, etc.). However, in Lottie Style Sheets, the gradient line is always horizontal, starting from the left (0%) to the right (100%).

The `linear-gradient()` function takes multiple color-stop arguments where you specify a color and its position along the gradient line. The position is usually defined by a percentage. For example:

```css
GradientFillShape {
    fill-color: linear-gradient(red 20%, blue 80%);
}
```

In this example, the gradient starts with red at 20% from the left and transitions to blue starting from 80% to the end of the `GradientFillShape`. The area between 20% and 80% will be a transition from red to blue.


### Radial Gradient Color Value

The `radial-gradient()` function for fill-color property in `GradientFillShape` creates a radial gradient with color transitions radiating from a certain point. By default, this point is the center of the element.

The `radial-gradient()` function, similar to `linear-gradient()`, takes multiple color-stop arguments where you specify a color and its position along the gradient radius. The position is usually defined by a percentage. For example:


```css
GradientFillShape {
    fill-color: radial-gradient(yellow 20%, green 80%);
}
```

In this example, the gradient starts with yellow at 20% from the center and transitions to green starting from 80% to the edge of the `GradientFillShape`. The area between 20% and 80% will be a transition from yellow to green.