const Candle = require('../../Candle/Candle');

module.exports = function insert(candle) {
  let { candleIds, candles } = this;

  if(!candle || candle.constructor !== Candle){
    throw new Error('Expected a candle');
  }
  const id = candle.getId();
  const alreadyInserted = this.lookupByCandleId(id);
  if (!alreadyInserted) {
    if (!candleIds.length) {
      candles.push(candle);
      candleIds.push(id);
    }else{
      candles.push(candle);
      candleIds.push(id);
    }
  }

  this.candles = this.candles.sort((next,prev) => {
    return next.openTime.to('s') - prev.openTime.to('s')
  });
  return true;
}
