module.exports = {
  port: 9301,
  startPath: '/web',
  open: 'external',
  host: 'dev.localhost',
  server: {
    baseDir: './dist/apps/web.prod',
    middleware: {
      1: require('compression')(),
    },
  },
};
