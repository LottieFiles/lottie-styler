/**
 * Copyright 2023 Design Barn Inc.
 */

const createCacheKeyFunction = require('@jest/create-cache-key-function').default;

// this transformer is used to load .lss as a string
module.exports = {
  process(content) {
    const code = `module.exports = \`${content}\`;`;

    return {
      code,
    };
  },
  getCacheKey: createCacheKeyFunction(),
};
