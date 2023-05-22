/**
 * Copyright 2023 Design Barn Inc.
 */

/* eslint-disable padding-line-between-statements */

import type { ObjectNode, Root } from '@lottiefiles/last';
import { parse as parseLss } from '@lottiefiles/lottie-style-sheets';
import type { Declaration } from '@lottiefiles/lottie-style-sheets';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
// eslint-disable-next-line import/no-namespace
import * as parsel from 'parsel-js';
import type { Transformer, Plugin } from 'unified';
import { visit } from 'unist-util-visit';

import { applyGradient, isLinearGradient, isRadialGradient, normalizeGradient } from './gradient';

extend([namesPlugin]);

export interface Options {
  lss: string;
}

type AttributeType = 'layer-xml-id' | 'css-class' | 'name' | 'layer-type' | 'shape-type';
type AttributeValue = string | number;

const findNodesByAttribute = (
  nodeOrList: Root | ObjectNode | ObjectNode[],
  value: AttributeValue,
  type: AttributeType,
  isOwnAttribute: boolean = false,
): ObjectNode[] => {
  const result = new Set<ObjectNode>();

  const list = Array.isArray(nodeOrList) ? nodeOrList : [nodeOrList];

  for (const node of list) {
    visit(node, 'attribute', (attr, _, parent) => {
      if (attr.title === type && attr.children[0]?.value === value && parent && parent.type !== 'root') {
        if (isOwnAttribute) {
          if (parent === node) {
            result.add(parent);
          }
        } else {
          result.add(parent);
        }
      }
    });
  }

  return Array.from(result);
};

const querySelectorAll = (root: Root, selectors: string[]): ObjectNode[] => {
  const matchedNodes = [];

  for (const selector of selectors) {
    let result: ObjectNode[] = [];

    const ast = parsel.parse(selector);

    parsel.walk(ast, (node, parent) => {
      const roots = result.length > 0 ? result : root;

      if (node.type === 'id') {
        const lastNodes = findNodesByAttribute(roots, node.name, 'layer-xml-id', parent?.type === 'compound');

        result = lastNodes;
      } else if (node.type === 'class') {
        const lastNodes = findNodesByAttribute(roots, node.name, 'css-class', parent?.type === 'compound');

        result = lastNodes;
      } else if (node.type === 'type') {
        let value: string | number = '';
        let type: AttributeType | null = null;

        if (node.name === 'FillShape') {
          type = 'shape-type';
          value = 'fl';
        } else if (node.name === 'StrokeShape') {
          type = 'shape-type';
          value = 'st';
        } else if (node.name === 'GradientFillShape') {
          type = 'shape-type';
          value = 'gf';
        } else if (node.name === 'GradientStrokeShape') {
          type = 'shape-type';
          value = 'gs';
        } else if (node.name === 'ShapeLayer') {
          type = 'layer-type';
          value = 4;
        } else if (node.name === 'SolidColorLayer') {
          type = 'layer-type';
          value = 1;
        } else if (node.name === 'ImageLayer') {
          type = 'layer-type';
          value = 2;
        }

        if (type && value) {
          const lastNodes = findNodesByAttribute(roots, value, type);

          result = lastNodes;
        }
      } else if (node.type === 'attribute') {
        let type: AttributeType | null = null;
        let value: string | number | undefined = node.value;

        if (node.name === 'id') {
          type = 'layer-xml-id';
        } else if (node.name === 'class') {
          type = 'css-class';
        } else if (node.name === 'name') {
          type = 'name';
        } else if (node.name === 'shape-type') {
          type = 'shape-type';
        } else if (node.name === 'layer-type') {
          type = 'layer-type';
          value = Number(node.value);
        }

        if (type && value && ['number', 'string'].includes(typeof value)) {
          const lastNodes = findNodesByAttribute(roots, value, type, parent?.type === 'compound');

          result = lastNodes;
        }
      }
    });

    matchedNodes.push(...result);
  }

  return Array.from(new Set(matchedNodes));
};

type RGBAColor = [number, number, number, number];

interface NormalizedStyles {
  'fill-color'?: RGBAColor;
  'fill-rule'?: 1 | 2;
  hidden?: boolean;
  'linear-gradient-fill-color'?: number[];
  'linear-gradient-stroke-color'?: number[];
  opacity?: number;
  'radial-gradient-fill-color'?: number[];
  'radial-gradient-stroke-color'?: number[];
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

        default:
          break;
      }
    } else if (isColorProperty(declaration.property) && isLinearGradient(declaration.value)) {
      const value = normalizeGradient(declaration.value);

      switch (declaration.property) {
        case 'fill-color':
          styles['linear-gradient-fill-color'] = value;
          break;

        case 'stroke-color':
          styles['linear-gradient-stroke-color'] = value;
          break;

        default:
          break;
      }
    } else if (isColorProperty(declaration.property) && isRadialGradient(declaration.value)) {
      const value = normalizeGradient(declaration.value);

      switch (declaration.property) {
        case 'fill-color':
          styles['radial-gradient-fill-color'] = value;
          break;

        case 'stroke-color':
          styles['radial-gradient-stroke-color'] = value;
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
        const rgbaArray = styles[prop];

        if (root.title === 'shape-fill') {
          if (Array.isArray(rgbaArray)) {
            visit(root, 'primitive', (node, index, parent) => {
              if (parent?.title === 'color-rgba-children' && typeof index === 'number') {
                node.value = rgbaArray[index] as number;
              }
            });
          }
        } else if (root.title === 'layer-solid-color') {
          visit(root, 'attribute', (attr) => {
            if (attr.title === 'hex-color' && attr.children[0]?.value && rgbaArray?.length === 4) {
              const hex = colord({
                r: rgbaArray[0] * 255,
                g: rgbaArray[1] * 255,
                b: rgbaArray[2] * 255,
                a: rgbaArray[3],
              }).toHex();

              attr.children[0].value = hex;
            }
          });
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

      case 'fill-rule':
        if (['shape-fill', 'shape-gradient-fill'].includes(root.title)) {
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

      case 'linear-gradient-fill-color':
      case 'linear-gradient-stroke-color':
        applyGradient(root, styles[prop] as number[], 'linear');
        break;
      case 'radial-gradient-fill-color':
      case 'radial-gradient-stroke-color':
        applyGradient(root, styles[prop] as number[], 'radial');
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
