# opacity

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