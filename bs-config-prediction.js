module.exports = {
  port: 9501,
  startPath: '/prediction',
  open: 'external',
  host: 'dev.localhost',
  server: {
    baseDir: './dist/apps/prediction',
    middleware: {
      1: require('compression')(),
    },
  },
};
