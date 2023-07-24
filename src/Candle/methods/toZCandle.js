const ZCandle = require('../../ZCandle/ZCandle');
module.exports = function toZCandle(){
  const compressed = this.toCompressed();
  return new ZCandle(compressed);
}
