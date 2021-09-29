module.exports = {
  port: 9401,
  open: 'external',
  host: 'dev.localhost',
  server: {
    baseDir: './dist/apps/lottery',
    middleware: {
      1: require('compression')(),
    },
  },
};
