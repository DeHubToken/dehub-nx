module.exports = {
  port: 9301,
  open: 'external',
  host: 'dev.localhost',
  server: {
    baseDir: './dist/apps/web',
    middleware: {
      1: require('compression')(),
    },
  },
};
