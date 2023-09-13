/**
 * Copyright 2023 Design Barn Inc.
 */

/* eslint-disable padding-line-between-statements */

import type { ArrayNodeValue, ObjectNode, Root } from '@lottiefiles/last';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
// eslint-disable-next-line import/no-namespace
import * as parsel from 'parsel-js';
import { parse as parseValue } from 'postcss-values-parser';
import type { Transformer, Plugin } from 'unified';
import type { VisitorResult } from 'unist-util-visit';
import { EXIT, visit, CONTINUE } from 'unist-util-visit';

import { applyGradient, isLinearGradient, isRadialGradient, normalizeGradient } from './gradient';

extend([namesPlugin]);

export type LottieStyleSheet = Record<string, Record<string, string>>;

export interface Options {
  lss: LottieStyleSheet;
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
  src?: string;
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

const isValidUrl = (value: string): boolean => {
  try {
    // eslint-disable-next-line no-new
    new URL(value);
  } catch (_) {
    return false;
  }

  return true;
};

const getSrcUrl = (value: string): string => {
  const root = parseValue(value);

  const nodes = root.nodes;

  if (nodes.length === 1) {
    const node = nodes[0];

    if (node && node.type === 'func' && node.name === 'url') {
      const nestedNodes = node.nodes;

      if (nestedNodes.length === 1) {
        const nestedNode = nestedNodes[0];

        if (nestedNode && nestedNode.type === 'quoted') {
          const content = nestedNode.contents;

          return content;
        }
      }
    }
  }

  return '';
};

const normalizeStyles = (properties: Record<string, string>): NormalizedStyles => {
  const styles: NormalizedStyles = {};

  for (const [property, value] of Object.entries(properties)) {
    if (isColorProperty(property) && colord(value).isValid()) {
      const rgbaColor = colord(value).rgba;

      const colorValue: RGBAColor = [rgbaColor.r / 255, rgbaColor.g / 255, rgbaColor.b / 255, rgbaColor.a];

      switch (property) {
        case 'fill-color':
          styles['fill-color'] = colorValue;
          break;

        case 'stroke-color':
          styles['stroke-color'] = colorValue;
          break;

        default:
          break;
      }
    } else if (isColorProperty(property) && isLinearGradient(value)) {
      const gradientValue = normalizeGradient(value);

      switch (property) {
        case 'fill-color':
          styles['linear-gradient-fill-color'] = gradientValue;
          break;

        case 'stroke-color':
          styles['linear-gradient-stroke-color'] = gradientValue;
          break;

        default:
          break;
      }
    } else if (isColorProperty(property) && isRadialGradient(value)) {
      const gradientValue = normalizeGradient(value);

      switch (property) {
        case 'fill-color':
          styles['radial-gradient-fill-color'] = gradientValue;
          break;

        case 'stroke-color':
          styles['radial-gradient-stroke-color'] = gradientValue;
          break;

        default:
          break;
      }
    } else if (property === 'stroke-width') {
      styles['stroke-width'] = Number(value);
    } else if (property === 'fill-rule' && isValidFillRule(value)) {
      styles['fill-rule'] = normalizeFillRule(value);
    } else if (property === 'opacity') {
      const opacity = normalizeOpacity(value);

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
    } else if (property === 'visibility') {
      styles['hidden'] = value === 'hidden';
    } else if (property === 'src') {
      const url = getSrcUrl(value);
      if (isValidUrl(url)) {
        styles['src'] = url;
      }
    }
  }

  return styles;
};

const apply = (targetNode: ObjectNode, styles: NormalizedStyles, root: Root): void => {
  for (const prop of Object.keys(styles)) {
    switch (prop) {
      case 'fill-color':
        const rgbaArray = styles[prop];

        if (targetNode.title === 'shape-fill') {
          if (Array.isArray(rgbaArray)) {
            visit(targetNode, 'array', (node): VisitorResult => {
              const title = node.title as string;

              if (title === 'color-rgba-children' && node.children.length === 4) {
                node.children = node.children.map((child, index) => ({
                  ...child,
                  value: rgbaArray[index],
                })) as ArrayNodeValue[];

                return EXIT;
              }

              return CONTINUE;
            });
          }
        } else if (targetNode.title === 'layer-solid-color') {
          visit(targetNode, 'attribute', (attr) => {
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
        if (targetNode.title === 'shape-stroke') {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const rgbaArray = styles[prop];

          if (Array.isArray(rgbaArray)) {
            visit(targetNode, 'array', (node): VisitorResult => {
              const title = node.title as string;

              if (title === 'static-values-children' && node.children.length === 4) {
                node.children = node.children.map((child, index) => ({
                  ...child,
                  value: rgbaArray[index],
                })) as ArrayNodeValue[];

                return EXIT;
              }

              return CONTINUE;
            });
          }
        }
        break;

      case 'stroke-width':
        if (targetNode.title === 'shape-stroke' || targetNode.title === 'shape-gradient-stroke') {
          visit(targetNode, 'element', (node) => {
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
        if (['shape-fill', 'shape-gradient-fill'].includes(targetNode.title)) {
          visit(targetNode, 'attribute', (attr) => {
            if (attr.title === 'fill-rule-value' && attr.children[0]?.value) {
              attr.children[0].value = styles[prop] as number;
            }
          });
        }
        break;

      case 'opacity':
        if (['shape-stroke', 'shape-fill', 'shape-gradient-fill', 'shape-gradient-stroke'].includes(targetNode.title)) {
          visit(targetNode, 'element', (node) => {
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
        if (targetNode.title.includes('shape') || targetNode.title.includes('layer')) {
          visit(targetNode, 'attribute', (attr) => {
            if (attr.title === 'hidden' && attr.children[0]) {
              attr.children[0].value = styles[prop] as boolean;
            }
          });
        }

        break;

      case 'linear-gradient-fill-color':
      case 'linear-gradient-stroke-color':
        applyGradient(targetNode, styles[prop] as number[], 'linear');
        break;
      case 'radial-gradient-fill-color':
      case 'radial-gradient-stroke-color':
        applyGradient(targetNode, styles[prop] as number[], 'radial');
        break;

      case 'src':
        if (targetNode.title === 'layer-image') {
          const attr = targetNode.children.find((node) => node.title === 'image-id');
          if (attr?.type === 'attribute') {
            const imgId = attr.children[0]?.value;
            visit(root, 'object', (object) => {
              if (object.title === 'asset-image') {
                const isSameImage = object.children.some(
                  (node) =>
                    node.title === 'id' && node.children[0]?.type === 'primitive' && node.children[0].value === imgId,
                );
                if (isSameImage) {
                  visit(object, 'attribute', (attrNode) => {
                    if (attrNode.title === 'embedded' && attrNode.children[0]) {
                      attrNode.children[0].value = 0;
                    } else if (attrNode.title === 'path' && attrNode.children[0]) {
                      attrNode.children[0].value = '';
                    } else if (attrNode.title === 'filename' && attrNode.children[0]) {
                      attrNode.children[0].value = styles[prop] as string;
                    }
                  });
                }
              }
            });
          }
        }
        break;

      default:
        break;
    }
  }
};

const relottieStyle: Plugin<[Options?], Root, Root> = (options: Options = { lss: {} }) => {
  const transformer: Transformer<Root> = async (last: Root): Promise<void> => {
    for (const [selector, properties] of Object.entries(options.lss)) {
      const lastNodes = querySelectorAll(last, selector.split(',').filter(Boolean));
      const styles = normalizeStyles(properties);

      for (const lastNode of lastNodes) {
        apply(lastNode, styles, last);
      }
    }
  };

  return transformer;
};

export default relottieStyle;
