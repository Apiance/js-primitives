module.exports = function toID(){
  return `${this.exchange}::${this.symbol}::${this.timestamp}::${this.id}`;
}
