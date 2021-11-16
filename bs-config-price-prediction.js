module.exports = {
  port: 9501,
  open: 'external',
  host: 'dev.localhost',
  server: {
    baseDir: './dist/apps/price-prediction',
    middleware: {
      1: require('compression')(),
    },
  },
};
