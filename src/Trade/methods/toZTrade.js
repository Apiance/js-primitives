module.exports = function toZTrade(){
  const ZTrade = require('../../ZTrade/ZTrade');
  return new ZTrade(this.toCompressed());
}
