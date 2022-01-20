module.exports = {
  port: 9601,
  startPath: '/staking',
  open: 'external',
  host: 'dev.localhost',
  server: {
    baseDir: './dist/apps/staking',
    middleware: {
      1: require('compression')(),
    },
  },
};
