module.exports = function toJSON(){
  const { id, rate, quantity, side, buyOrderId, sellOrderId, timestamp } = this;
  const market = this.market.toJSON();
  return {
    market,
    id,
    rate,
    quantity,
    side,
    buyOrderId,
    sellOrderId,
    timestamp
  }
}
