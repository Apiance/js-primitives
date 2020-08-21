function fromArray(props){
  const candleSet = new CandleSet();
  props.forEach((prop)=>{
    candleSet.insert(prop);
  });
  return candleSet;
}

// TODO: Ensure a CandleSet is stored in the descending order, the more recent at candles[0], the oldest at candles[c.length-1].
class CandleSet {
  constructor(props) {
    if(Array.isArray(props)) return fromArray(props);

    this.candles = [];
    Object.defineProperty(this, 'candles', {
      writable: true,
      enumerable: false,
    });

    this.candleIds = [];
    Object.defineProperty(this, 'candleIds', {
      writable: true,
      enumerable: false,
    });

    this.candleStored = 0;
  }
};
CandleSet.prototype.insert = require('./methods/insert');
CandleSet.prototype.lookupByCandleId = require('./methods/lookupByCandleId');
CandleSet.prototype.reset = require('./methods/reset');
module.exports = CandleSet;
