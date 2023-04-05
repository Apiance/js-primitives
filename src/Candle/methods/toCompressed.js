module.exports = function toCompressed() {
  const {market, interval, openTime, open, close, low, high, volume, trades, id} = this;
  let compressed = `C::${market}::${interval}::${openTime}::${id}::${open}::${high}::${low}::${close}`;

  if (volume && (volume.quote || volume.base)) {
    const { base, quote } = volume;
    compressed += `::${(base) ? base : ''}-${(quote) ? quote : ''}`;
  }

  if (trades) {
    compressed += `::${trades}`;
  }

  return compressed;
}
