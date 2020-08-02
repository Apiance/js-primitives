module.exports = function toCompressed(){
  const market = this.market;
  const side = (this.side === 'BUY') ? 1 : -1;
  const { timestamp, id, rate, quantity, buyOrderId, sellOrderId} = this;
  return `Z::${market}::${timestamp}::${id}::${rate}::${quantity}::${side}::${buyOrderId}::${sellOrderId}`;
}
