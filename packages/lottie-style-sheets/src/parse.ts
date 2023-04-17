/**
 * Copyright 2023 Design Barn Inc.
 */

import { parse as parseCss } from 'postcss';
import { u } from 'unist-builder';

import { CLASS_SELECTOR_TYPE, DELARATION_TYPE, ID_SELECTOR_TYPE, RULE_TYPE, ROOT_TYPE } from './constants';
import type { ClassSelector, Declaration, IdSelector, Rule, Root } from './types';
import { isClassSelector, isIdSelector, stripSelectorPrefix } from './utils';

const createLssSelectors = (selectors: string[]): Array<IdSelector | ClassSelector> => {
  const lssSelectors = [];

  for (const selector of selectors) {
    if (isClassSelector(selector)) {
      lssSelectors.push(
        u(CLASS_SELECTOR_TYPE, {
          value: stripSelectorPrefix(selector),
        }),
      );
    } else if (isIdSelector(selector)) {
      lssSelectors.push(
        u(ID_SELECTOR_TYPE, {
          value: stripSelectorPrefix(selector),
        }),
      );
    }
  }

  return lssSelectors;
};

export function parse(source: string): Root {
  const root: Root = u(ROOT_TYPE, []);

  const cssTree = parseCss(source);

  cssTree.walkRules((rule) => {
    const ruleNode: Rule = u(
      RULE_TYPE,
      {
        selectors: [],
      },
      [],
    );

    const selectors = createLssSelectors(rule.selectors);

    ruleNode.selectors.push(...selectors);

    rule.walkDecls((decl) => {
      const declNode: Declaration = u(DELARATION_TYPE, {
        important: decl.important,
        property: decl.prop,
        value: decl.value,
      });

      ruleNode.children.push(declNode);
    });

    root.children.push(ruleNode);
  });

  return root;
}
