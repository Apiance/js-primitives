module.exports = function toJSON(){
  const { symbol, exchange, id, rate, quantity, side, buyOrderId, sellOrderId, timestamp } = this;
  return {
    symbol,
    exchange,
    id,
    rate,
    quantity,
    side,
    buyOrderId,
    sellOrderId,
    timestamp
  }
}
