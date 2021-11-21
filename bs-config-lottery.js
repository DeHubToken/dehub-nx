module.exports = {
  port: 9401,
  startPath: '/lottery',
  open: 'external',
  host: 'dev.localhost',
  server: {
    baseDir: './dist/apps',
    middleware: {
      1: require('compression')(),
    },
  },
};
