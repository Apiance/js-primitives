module.exports = function toJSON(){
  const { rate, timestamp } = this;
  const market = this.market.toJSON();
  return {
    market,
    rate,
    timestamp
  }
}
