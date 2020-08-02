class Market {
  constructor(props = {}) {
    this.exchange = props.exchange || null;
    this.symbol = props.symbol || null;
  }
  toString(){
    return `${this.exchange.toString()}::${this.symbol}`;
  }
};
module.exports = Market;
