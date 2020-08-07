class Market {
  constructor(props = {}) {
    this.exchange = props?.exchange?.toString().toUpperCase() || null;
    this.symbol = props?.symbol?.toString().toUpperCase() || null;
  }
  toObject(){
    return this;
  }
  toJSON(){
    return this.toString();
  }
  toString(){
    return `${this.exchange.toString()}::${this.symbol}`;
  }
};
module.exports = Market;
