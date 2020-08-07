class CandleSet {
  constructor() {
    this.candles = [];
    this.candleIds = [];
  }

};
CandleSet.prototype.insert = require('./methods/insert');
CandleSet.prototype.lookupByCandleId = require('./methods/lookupByCandleId');
CandleSet.prototype.reset = require('./methods/reset');
module.exports = CandleSet;
