const Candle = require('../../Candle/Candle');

module.exports = function insert(candle) {
  let { candleIds, candles } = this;

  if (!candle || candle.constructor !== Candle) {
    throw new Error('Expected a candle');
  }
  const id = candle.getId();
  const alreadyInserted = this.lookupByCandleId(id);

  if (!alreadyInserted) {
    candles.push(candle);
    candleIds.push(id);
    // TODO : Verify ordering is correct or re-order.
    this.candleStored += 1;
  }
  return true;
}
