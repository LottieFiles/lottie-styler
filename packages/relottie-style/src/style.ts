/**
 * Copyright 2023 Design Barn Inc.
 */

import type { ObjectNode, Root } from '@lottiefiles/last';
import { parse as parseLss } from '@lottiefiles/lottie-style-sheets';
import type { Declaration } from '@lottiefiles/lottie-style-sheets';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import type { Transformer, Plugin } from 'unified';
import { visit } from 'unist-util-visit';

extend([namesPlugin]);

export interface Options {
  lss: string;
}

const canStyleShapeTitles = [
  'shape-fill',
  'shape-stroke',
  'layer-solid-color',
  'shape-gradient-fill',
  'shape-gradient-stroke',
];

const hasClassName = (root: ObjectNode, className: string): boolean => {
  return root.children.some(
    (node) =>
      node.type === 'attribute' &&
      node.title === 'css-class' &&
      typeof node.children[0]?.value === 'string' &&
      node.children[0].value.includes(className),
  );
};

const hasId = (root: ObjectNode, id: string): boolean => {
  return root.children.some(
    (node) => node.type === 'attribute' && node.title === 'layer-xml-id' && id === node.children[0]?.value,
  );
};

const getShapesByClassName = (root: Root, className: string): ObjectNode[] => {
  const result: ObjectNode[] = [];

  visit(root, 'object', (node) => {
    if (canStyleShapeTitles.includes(node.title) && hasClassName(node, className)) {
      result.push(node);
    }
  });

  return result;
};

const getElementsByName = (root: Root, name: string): ObjectNode[] => {
  const result: ObjectNode[] = [];

  const elementNameMap: Record<string, string> = {
    'layer-solid-color': 'SolidColorLayer',
    'shape-fill': 'FillShape',
    'shape-stroke': 'StrokeShape',
    'shape-gradient-fill': 'GradientFillShape',
    'shape-gradient-stroke': 'GradientStrokeShape',
  };

  visit(root, 'object', (node) => {
    if (node.title) {
      const elementName = elementNameMap[node.title];

      if (elementName === name) {
        result.push(node);
      }
    }
  });

  return result;
};

const getShapesById = (root: Root, id: string): ObjectNode[] => {
  const result: ObjectNode[] = [];

  visit(root, 'object', (node) => {
    if (canStyleShapeTitles.includes(node.title) && hasId(node, id)) {
      result.push(node);
    }
  });

  return result;
};

const querySelectorAll = (root: Root, selectors: string[]): ObjectNode[] => {
  const result = new Set<ObjectNode>();

  for (const selector of selectors) {
    const selectorType = selector[0];
    const selectorValue = selector.slice(1);

    if (selectorType === '#') {
      const shapes = getShapesById(root, selectorValue);

      shapes.forEach((shape) => result.add(shape));
    } else if (selectorType === '.') {
      const shapes = getShapesByClassName(root, selectorValue);

      shapes.forEach((shape) => result.add(shape));
    } else {
      const elements = getElementsByName(root, selector);

      elements.forEach((element) => result.add(element));
    }
  }

  return Array.from(result);
};

type RGBAColor = [number, number, number, number];

interface NormalizedStyles {
  'fill-color'?: RGBAColor;
  'fill-rule'?: 1 | 2;
  hidden?: boolean;
  opacity?: number;
  'solid-color'?: string;
  'stroke-color'?: RGBAColor;
  'stroke-width'?: number;
}

const isColorProperty = (prop: string): boolean => {
  return prop.includes('-color');
};

const isValidFillRule = (value: string): boolean => {
  return value === 'nonzero' || value === 'evenodd';
};

const normalizeOpacity = (value: string): number => {
  if (value.endsWith('%')) {
    return parseFloat(value);
  }

  return parseFloat(value) * 100;
};

const normalizeFillRule = (value: string): 1 | 2 => {
  if (value === 'nonzero') {
    return 1;
  }

  return 2;
};

const normalizeStyles = (declarations: Declaration[]): NormalizedStyles => {
  const styles: NormalizedStyles = {};

  for (const declaration of declarations) {
    if (isColorProperty(declaration.property) && colord(declaration.value).isValid()) {
      const rgbaColor = colord(declaration.value).rgba;

      const value: RGBAColor = [rgbaColor.r / 255, rgbaColor.g / 255, rgbaColor.b / 255, rgbaColor.a];

      switch (declaration.property) {
        case 'fill-color':
          styles['fill-color'] = value;
          break;

        case 'stroke-color':
          styles['stroke-color'] = value;
          break;

        case 'solid-color':
          styles['solid-color'] = colord(declaration.value).toHex();
          break;

        default:
          break;
      }
    } else if (declaration.property === 'stroke-width') {
      styles['stroke-width'] = Number(declaration.value);
    } else if (declaration.property === 'fill-rule' && isValidFillRule(declaration.value)) {
      styles['fill-rule'] = normalizeFillRule(declaration.value);
    } else if (declaration.property === 'opacity') {
      const opacity = normalizeOpacity(declaration.value);

      if (Number.isNaN(opacity)) {
        continue;
      }

      if (opacity < 0) {
        styles['opacity'] = 0;
      } else if (opacity > 100) {
        styles['opacity'] = 100;
      } else {
        styles['opacity'] = opacity;
      }
    } else if (declaration.property === 'visibility') {
      styles['hidden'] = declaration.value === 'hidden';
    }
  }

  return styles;
};

const apply = (root: ObjectNode, styles: NormalizedStyles): void => {
  // eslint-disable-next-line guard-for-in
  for (const prop in styles) {
    switch (prop) {
      case 'fill-color':
        if (root.title === 'shape-fill') {
          const rgba = styles[prop];

          if (Array.isArray(rgba)) {
            visit(root, 'primitive', (node, index, parent) => {
              if (parent?.title === 'color-rgba-children' && typeof index === 'number') {
                node.value = rgba[index] as number;
              }
            });
          }
        }
        break;

      case 'stroke-color':
        if (root.title === 'shape-stroke') {
          const rgba = styles[prop];

          if (Array.isArray(rgba)) {
            visit(root, 'primitive', (node, index, parent) => {
              if (parent?.title === 'static-value-children' && typeof index === 'number') {
                node.value = rgba[index] as number;
              }
            });
          }
        }
        break;

      case 'stroke-width':
        if (root.title === 'shape-stroke' || root.title === 'shape-gradient-stroke') {
          visit(root, 'element', (node) => {
            if (node.title === 'stroke-width') {
              visit(node, 'attribute', (attr, _, parent) => {
                if (
                  attr.title === 'static-value' &&
                  attr.children[0]?.value &&
                  attr.children[0].valueType === 'number' &&
                  parent?.title === 'animated-value-static'
                ) {
                  attr.children[0].value = styles[prop] as number;
                }
              });
            }
          });
        }
        break;

      case 'solid-color':
        if (root.title === 'layer-solid-color') {
          visit(root, 'attribute', (attr) => {
            if (attr.title === 'hex-color' && attr.children[0]?.value) {
              attr.children[0].value = styles[prop] as string;
            }
          });
        }
        break;

      case 'fill-rule':
        if (root.title === 'shape-fill' || root.title === 'shape-gradient-fill') {
          visit(root, 'attribute', (attr) => {
            if (attr.title === 'fill-rule' && attr.children[0]?.value) {
              attr.children[0].value = styles[prop] as number;
            }
          });
        }
        break;

      case 'opacity':
        if (['shape-stroke', 'shape-fill', 'shape-gradient-fill', 'shape-gradient-stroke'].includes(root.title)) {
          visit(root, 'element', (node) => {
            if (['stroke-opacity', 'opacity'].includes(node.title)) {
              visit(node, 'attribute', (attr, _, parent) => {
                if (
                  attr.title === 'static-value' &&
                  attr.children[0]?.value &&
                  attr.children[0].valueType === 'number' &&
                  parent?.title === 'animated-value-static'
                ) {
                  attr.children[0].value = styles[prop] as number;
                }
              });
            }
          });
        }
        break;

      case 'hidden':
        if (root.title.includes('shape') || root.title.includes('layer')) {
          visit(root, 'attribute', (attr) => {
            if (attr.title === 'hidden' && attr.children[0]) {
              attr.children[0].value = styles[prop] as boolean;
            }
          });
        }

        break;

      default:
        break;
    }
  }
};

const relottieStyle: Plugin<[Options?], Root, Root> = (options: Options = { lss: '' }) => {
  const transformer: Transformer<Root> = async (last: Root): Promise<void> => {
    const lssast = parseLss(options.lss);

    visit(lssast, 'rule', (node) => {
      const lastNodes = querySelectorAll(last, node.selectors);
      const styles = normalizeStyles(node.children);

      for (const lastNode of lastNodes) {
        apply(lastNode, styles);
      }
    });
  };

  return transformer;
};

export default relottieStyle;
