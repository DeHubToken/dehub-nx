const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  /**
   * BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
   * Solution: https://stackoverflow.com/questions/68206050/breaking-change-webpack-5-used-to-include-polyfills-for-node-js-core-modules
   */
  plugins: [new NodePolyfillPlugin()],
};
