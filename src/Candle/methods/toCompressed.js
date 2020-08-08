module.exports = function toCompressed() {
  const {market, timeframe, openTime, open, close, low, high, volume, trades} = this;
  let compressed = `C::${market}::${timeframe}::${openTime}::${open}::${high}::${low}::${close}`;
  if (volume) {
    compressed += `::${volume}`;
    if (trades) {
      compressed += `::${trades}`;
    }
  }
  return compressed;
}
