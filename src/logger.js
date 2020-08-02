const pino = require('pino');

let prettyPrint = true;

if (process.env.NODE_ENV === 'development') {
  prettyPrint = {
    colorize: true,
    levelFirst: true,
    translateTime: true
  };
}

module.exports = (filename) => {
  return pino({
    prettyPrint,
    base: '',
    level: 'trace'
  });
};
