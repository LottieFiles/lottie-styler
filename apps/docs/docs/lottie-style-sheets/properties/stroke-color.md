# stroke-color

The `stroke-color` property in LSS defines the color of a `StrokeShape` or `GradientStrokeShape`. You can specify the color in any valid CSS color format.

Here's how you can use the stroke-color property:

## For `StrokeShape`

```css
StrokeShape {
    stroke-color: red;
}
```
In this example, the `StrokeShape` will be stroked with red color.

## For `GradientStrokeShape`

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


### Linear Gradient Color Value

The `linear-gradient()` function creates a linear gradient with color transitions along a straight line. This line is defined by an angle or a direction (to top, to right, to bottom left, etc.). However, in Lottie Style Sheets, the gradient line is always horizontal, starting from the left (0%) to the right (100%).

The `linear-gradient()` function takes multiple color-stop arguments where you specify a color and its position along the gradient line. The position is usually defined by a percentage.

Here's an example:

```css
GradientStrokeShape {
    stroke-color: linear-gradient(red 20%, blue 80%);
}
```

In this example, the gradient stroke starts with red at 20% from the left and transitions to blue starting from 80% to the end of the `GradientStrokeShape`. The area between 20% and 80% will be a transition from red to blue.

### Radial Gradient Color Value

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
