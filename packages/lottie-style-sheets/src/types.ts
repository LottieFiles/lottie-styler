/**
 * Copyright 2023 Design Barn Inc.
 */

import type { Parent as UnistParent, Literal as UnistLiteral } from 'unist';

export type RootType = 'root';
export type RuleType = 'rule';
export type ClassSelectorType = 'class-selector';
export type IdSelectorType = 'id-selector';
export type DeclarationType = 'declaration';

export interface ClassSelector extends UnistLiteral {
  type: ClassSelectorType;
  value: string;
}

export interface IdSelector extends UnistLiteral {
  type: IdSelectorType;
  value: string;
}

export interface Declaration extends UnistLiteral {
  important: boolean;
  property: string;
  type: DeclarationType;
  value: string;
}

export interface Rule extends UnistParent {
  children: Declaration[];
  selectors: Array<IdSelector | ClassSelector>;
  type: RuleType;
}

export interface Root extends UnistParent {
  children: Rule[];
  type: RootType;
}

export type Node = Root | Rule | Declaration;
export type NodeType = Node['type'];
