/**
 * Copyright 2023 Design Barn Inc.
 */

import type { Parent as UnistParent, Literal as UnistLiteral } from 'unist';

export type RootType = 'root';
export type RuleType = 'rule';
export type DeclarationType = 'declaration';

export interface Declaration extends UnistLiteral {
  important: boolean;
  property: string;
  type: DeclarationType;
  value: string;
}

export interface Rule extends UnistParent {
  children: Declaration[];
  selector: string;
  selectors: string[];
  type: RuleType;
}

export interface Root extends UnistParent {
  children: Rule[];
  type: RootType;
}

export type Node = Root | Rule | Declaration;
export type NodeType = Node['type'];
