/**
 * Copyright 2023 Design Barn Inc.
 */

import type { ObjectNode, Root } from '@lottiefiles/last';
import { parse as parseLss } from '@lottiefiles/lottie-style-sheets';
import type { Rule, Declaration } from '@lottiefiles/lottie-style-sheets';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import type { Transformer, Plugin } from 'unified';
import { is } from 'unist-util-is';
import { visit } from 'unist-util-visit';

extend([namesPlugin]);

export interface Options {
  lss: string;
}

const canStyleShapeTitles = ['shape-fill', 'shape-stroke'];

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
    }
  }

  return Array.from(result);
};

type RGBAColor = [number, number, number, number];

interface NormalizedStyles {
  'fill-color'?: RGBAColor;
  'stroke-color'?: RGBAColor;
  'stroke-width'?: number;
}

const isColorProperty = (prop: string): boolean => {
  return prop.includes('-color');
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

        default:
          break;
      }
    } else if (declaration.property === 'stroke-width') {
      styles['stroke-width'] = Number(declaration.value);
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
          const rgba = styles[prop] as RGBAColor;

          visit(root, 'primitive', (node, index, parent) => {
            if (parent?.title === 'color-rgba-children' && typeof index === 'number') {
              node.value = rgba[index] as number;
            }
          });
        }
        break;

      case 'stroke-color':
        if (root.title === 'shape-stroke') {
          const rgba = styles[prop] as RGBAColor;

          visit(root, 'primitive', (node, index, parent) => {
            if (parent?.title === 'static-value-children' && typeof index === 'number') {
              node.value = rgba[index] as number;
            }
          });
        }
        break;

      case 'stroke-width':
        if (root.title === 'shape-stroke') {
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

      default:
        break;
    }
  }
};

const relottieStyle: Plugin<[Options?], Root, Root> = (options: Options = { lss: '' }) => {
  const transformer: Transformer<Root> = async (last: Root): Promise<void> => {
    const lssast = parseLss(options.lss);

    visit(lssast, (node) => {
      if (is<Rule>(node, 'rule')) {
        const lastNodes = querySelectorAll(last, node.selectors);
        const styles = normalizeStyles(node.children);

        for (const lastNode of lastNodes) {
          apply(lastNode, styles);
        }
      }
    });
  };

  return transformer;
};

export default relottieStyle;
