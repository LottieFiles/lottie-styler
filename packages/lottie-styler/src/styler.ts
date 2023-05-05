/**
 * Copyright 2023 Design Barn Inc.
 */

import { relottie } from '@lottiefiles/relottie';
import style from '@lottiefiles/relottie-style';
import type { Compatible } from 'vfile';

interface Styler {
  style: (lottieStyleSheets: string) => Promise<Compatible>;
}

export const createStyler = (lottieJsonString: string): Styler => {
  const processor = relottie();

  return {
    style: async (lss: string): Promise<Compatible> => {
      return processor
        .use(style, {
          lss,
        })
        .process(lottieJsonString);
    },
  };
};
