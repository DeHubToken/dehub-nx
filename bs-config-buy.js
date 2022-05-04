module.exports = {
  port: 9701,
  startPath: '/buy',
  open: 'external',
  host: 'dev.localhost',
  server: {
    baseDir: './dist/apps/buy.prod',
    middleware: {
      1: require('compression')(),
    },
  },
};
