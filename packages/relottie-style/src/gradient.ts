/**
 * Copyright 2023 Design Barn Inc.
 */

import type { ObjectNode } from '@lottiefiles/last';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import { parse } from 'gradient-parser';
import { visit } from 'unist-util-visit';

extend([namesPlugin]);

export const isLinearGradient = (value: string): boolean => {
  try {
    if (!value.startsWith('linear-gradient')) return false;

    const nodes = parse(value);

    if (nodes.length === 0) return false;

    const gradientNode = nodes[0];

    if (gradientNode?.type !== 'linear-gradient') return false;

    return true;
  } catch (err) {
    return false;
  }
};

export const isRadialGradient = (value: string): boolean => {
  try {
    if (!value.startsWith('radial-gradient')) return false;

    const nodes = parse(value);

    if (nodes.length === 0) return false;

    const gradientNode = nodes[0];

    if (gradientNode?.type !== 'radial-gradient') return false;

    return true;
  } catch (err) {
    return false;
  }
};

export const normalizeGradient = (value: string): number[] => {
  const lottieGradient: number[] = [];

  const alphaArray: number[] = [];

  if (!(isLinearGradient(value) || isRadialGradient(value))) return [];

  const nodes = parse(value);

  const gradient = nodes[0];

  gradient?.colorStops.forEach((colorStop, index) => {
    const rgb: number[] = [];

    let alpha: number = 0;

    if (colorStop.type === 'hex' || colorStop.type === 'literal') {
      const color = colord(colorStop.value);

      rgb.push(
        parseFloat((color.rgba.r / 255).toFixed(2)),
        parseFloat((color.rgba.g / 255).toFixed(2)),
        parseFloat((color.rgba.b / 255).toFixed(2)),
      );

      alpha = color.rgba.a;
    } else if (['rgb', 'rgba'].includes(colorStop.type)) {
      const color = colord({
        r: Number(colorStop.value[0]),
        g: Number(colorStop.value[1]),
        b: Number(colorStop.value[2]),
        a: colorStop.value[3] ? Number(colorStop.value[3]) : 1,
      });

      rgb.push(
        parseFloat((color.rgba.r / 255).toFixed(2)),
        parseFloat((color.rgba.g / 255).toFixed(2)),
        parseFloat((color.rgba.b / 255).toFixed(2)),
      );

      alpha = color.rgba.a;
    }

    let position: number = parseFloat((index / (gradient.colorStops.length - 1 || 1)).toFixed(2));

    if (colorStop.length?.value && Number(colorStop.length.value) > 0) {
      position = parseFloat((Number(colorStop.length.value) / 100).toFixed(2));
    }

    lottieGradient.push(position, ...rgb);

    alphaArray.push(position, alpha);
  });

  lottieGradient.push(...alphaArray);

  return lottieGradient;
};

export const applyGradient = (node: ObjectNode, gradient: number[], gradientType: 'radial' | 'linear'): void => {
  if (!['shape-gradient-fill', 'shape-gradient-stroke'].includes(node.title)) return;

  const count = gradient.length / 6;

  visit(node, 'attribute', (attr) => {
    if (attr.title === 'gradient-type' && attr.children[0]) {
      attr.children[0].value = gradientType === 'linear' ? 1 : 2;
    } else if (attr.title === 'count' && attr.children[0]) {
      attr.children[0].value = count;
    }
  });

  visit(node, 'collection', (collection) => {
    if (
      collection.title === 'static-values' &&
      typeof collection.key === 'object' &&
      collection.key.value === 'k' &&
      collection.children[0]
    ) {
      const childNode = collection.children[0];

      childNode.children = gradient.map((value) => ({
        type: 'primitive',
        valueType: 'number',
        value,
      }));
    }
  });
};
