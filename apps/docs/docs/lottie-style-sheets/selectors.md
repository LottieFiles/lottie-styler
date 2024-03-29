---
sidebar_position: 2
---

# Selectors

Selectors in Lottie Style Sheets (LSS) are used to target specific layers or shapes for styling. They can be broken down into four categories: ID, Class, Type, and Attribute selectors. 

## ID Selector

An ID selector targets a layer or shape based on its ID. To style a shape or layer, assign it an ID and then style it using this ID. Here's an example of how to use the ID selector:

```css
#my-fill-shape {
    fill-color: red;
}
```
In this example, the shape with the ID 'my-fill-shape' is filled with red color.

## Class Selector

A class selector targets a layer or shape based on its class. To use a class selector, assign a class to a layer or shape and style it using this class. Here's an example:

```css
.my-shape {
    fill-color: red;
}
```
In this example, all shapes with the class 'my-shape' will be filled with red color.

## Type Selector

A type selector targets a layer or shape based on its type. Supported types in LSS include `FillShape`, `StrokeShape`, `SolidColorLayer`, `ImageLayer`, `GradientFillShape`, and `GradientStrokeShape`. Here's how you can use the type selector:

```css
FillShape {
    fill-color: red;
}
```
In this example, all shapes of type `FillShape` will be filled with red color.

## Attribute Selector

An attribute selector targets a layer or shape based on an attribute. Supported attributes include `name`, `id`, and `class`. Here's an example of how to use an attribute selector:

```css
[name="my-fill-shape"] {
    fill-color: red;
}
```
In this example, all shapes with the attribute name equal to 'my-fill-shape' will be filled with red color.