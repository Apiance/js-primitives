module.exports = function lookupByCandleId(id) {
  const index = this.candleIds.indexOf(id);
  if (index === -1) {
    return null;
  }
  return { candle: this.candleIds[index], pos: index };
};
