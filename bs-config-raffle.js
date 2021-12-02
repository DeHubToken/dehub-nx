module.exports = {
  port: 9401,
  startPath: '/raffle',
  open: 'external',
  host: 'dev.localhost',
  server: {
    baseDir: './dist/apps/raffle',
    middleware: {
      1: require('compression')(),
    },
  },
};
