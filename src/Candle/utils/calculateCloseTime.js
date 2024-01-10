import Epoch from '../../Epoch/Epoch.js';

export default function calculateCloseTime(candle) {
  if(candle.closeTime) return candle.closeTime;
  if(!candle.interval || !candle.openTime) return;
  const type = candle.interval.slice(-1);
  const value = candle.interval.slice(0, candle.interval.length-1);

  let milliSecondsIninterval = {
    's' : 1000,
    'm' : 60000,
    'h' : 3600000,
    'd' : 86400000,
  };

  const startTs = parseInt(new Date(candle.openTime).valueOf());
  const endTs = startTs + (value * milliSecondsIninterval[type]) - 1;
  return new Epoch(endTs);
}
