module.exports = function toCompressed(){
  const { market, timeframe, openTime, open, close, low, high, volume } = this;
  return `C::${market}::${timeframe}::${openTime}::${open}::${high}::${low}::${close}::${volume}`;
}
