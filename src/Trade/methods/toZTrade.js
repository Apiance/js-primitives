const ZTrade = require('../../ZTrade/ZTrade');
module.exports = function toZTrade(){
  return new ZTrade(this.toCompressed());
}
