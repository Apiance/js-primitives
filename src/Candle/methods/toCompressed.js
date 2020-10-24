module.exports = function toCompressed() {
  const {market, interval, openTime, open, close, low, high, volume, trades} = this;
  let compressed = `C::${market}::${interval}::${openTime}::${open}::${high}::${low}::${close}`;

  if (volume.quote && volume.base) {
    compressed += `::${volume.base}-${volume.quote}`;

    if (trades) {
      compressed += `::${trades}`;
    }
  }

  return compressed;
}
