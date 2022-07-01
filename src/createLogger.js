const pino = require('pino');

module.exports = (filename) => {
  return pino({
    prettyPrint: {
      colorize: true,
      translateTime: "yyyy-mm-dd HH:MM:ss"
    },
    base: '',
    level: 'trace'
  });
};
