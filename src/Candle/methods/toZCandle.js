const ZCandle = require('../../ZCandle/ZCandle');
module.exports = function toZCandle(){
  return new ZCandle(this.toCompressed());
}
