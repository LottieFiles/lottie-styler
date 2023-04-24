/**
 * Copyright 2023 Design Barn Inc.
 */

import { parse as parseCss } from 'postcss';
import { u } from 'unist-builder';

import { DELARATION_TYPE, RULE_TYPE, ROOT_TYPE } from './constants';
import type { Declaration, Rule, Root } from './types';

export function parse(source: string): Root {
  const root: Root = u(ROOT_TYPE, []);

  const cssTree = parseCss(source);

  cssTree.walkRules((rule) => {
    const ruleNode: Rule = u(
      RULE_TYPE,
      {
        selectors: [],
        selector: '',
      },
      [],
    );

    ruleNode.selectors = [...rule.selectors];
    ruleNode.selector = rule.selector;

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
