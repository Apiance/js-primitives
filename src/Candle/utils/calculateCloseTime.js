const Epoch = require('../../Epoch/Epoch');
module.exports = function calculateCloseTime(candle) {
  if(candle.closeTime) return candle.closeTime;
  if(!candle.timeframe || !candle.openTime) return;
  const type = candle.timeframe.slice(-1);
  const value = candle.timeframe.slice(0, candle.timeframe.length-1);

  let milliSecondsInTimeframe = {
    's' : 1000,
    'm' : 60000,
    'h' : 3600000,
    'd' : 86400000,
  };

  const startTs = parseInt(new Date(candle.openTime).valueOf());
  const endTs = startTs + (value * milliSecondsInTimeframe[type]) - 1;
  return new Epoch(endTs);
}
