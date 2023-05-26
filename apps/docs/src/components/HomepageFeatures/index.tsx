/**
 * Copyright 2023 Design Barn Inc.
 */

/* eslint-disable @typescript-eslint/no-var-requires */

import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';

interface FeatureItem {
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  title: string;
}

const FeatureList: FeatureItem[] = [
  {
    title: 'Adapt Your Animation Styles Dynamically',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        With LSS, you gain the power to dynamically modify your animation styles. This flexibility allows you to
        instantly adapt to changes, making your animations as responsive as they are visually compelling.
      </>
    ),
  },
  {
    title: 'Style Animations Instantaneously',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        LSS offers you the capacity to style your animations on-the-fly. With real-time modifications at your
        fingertips, you can swiftly respond to changes and keep your animations looking fresh and engaging at all times.
      </>
    ),
  },
  {
    title: 'Unified Theming for All Animations',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Embrace the power of consistency with LSS. Our tool allows you to create a single, cohesive theme that can be
        applied across all your animations. This unified approach not only enhances your brand's visual identity but
        also simplifies the theming process, saving you valuable time and effort.
      </>
    ),
  },
];

function Feature({ Svg, description, title }: FeatureItem): JSX.Element {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
