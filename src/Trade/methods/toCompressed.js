module.exports = function toCompressed(){
  return `Trade-${this.exchange}::${this.symbol}::${this.timestamp}::${this.id}::${this.rate}::${this.quantity}::${this.side}::${this.buyOrderId}::${this.sellOrderId}`;
}
