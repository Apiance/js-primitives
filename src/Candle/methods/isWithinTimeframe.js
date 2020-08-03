const Epoch = require('../../Epoch/Epoch')
/**
 * For a provided timestamp, it will return if it's within the frame of the candle
 * @param timestamp - In nanoseconds
 * @return {boolean}
 */
module.exports = function isWithinTimeframe(timestamp){
  const ts = new Epoch(timestamp);
  const startTs = this.openTime;
  const endTs = this.closeTime;
  return startTs<=ts && ts<=endTs;
}
