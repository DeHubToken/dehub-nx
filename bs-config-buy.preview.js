module.exports = {
  port: 9701,
  startPath: '/buy',
  open: 'external',
  host: 'dev.localhost',
  server: {
    baseDir: './dist/apps/buy.preview',
    middleware: {
      1: require('compression')(),
    },
  },
};
