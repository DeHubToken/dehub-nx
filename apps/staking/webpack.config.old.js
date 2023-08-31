const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');

/**
 * @audit https://github.com/nrwl/nx/issues/14383#issuecomment-1384196230
 */
const moveRuleToFront = (config, loaderPattern) => {
  const { rule, index } = config.module.rules
    .map((rule, index) => ({ rule, index }))
    .find(
      ({ rule }) =>
        rule.use && rule.use.some(entry => entry.loader.includes(loaderPattern))
    );
  config.module.rules.splice(index, 1);
  config.module.rules.unshift(rule);
};

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), config => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`

  moveRuleToFront(config, '@svgr');

  return {
    ...config,
    node: undefined,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        // stream: require.resolve('stream-browserify'),
        // zlib: require.resolve('browserify-zlib'),
        // net: require.resolve('net-browserify'),
        // tls: require.resolve('tls-browserify'),
        // os: require.resolve('os-browserify'),
        // fs: require.resolve('browserify-fs'),
        // tty: require.resolve('tty-browserify'),
        // https: require.resolve('https-browserify'),
        // http: require.resolve('stream-http'),
        // crypto: require.resolve('crypto-browserify'),
      },
      fallback: {
        ...config.resolve.fallback,
        tls: false,
        zlib: false,
        net: false,
        fs: false,
      },
    },
  };
});
