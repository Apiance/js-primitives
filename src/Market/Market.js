class Market {
  constructor(props = {}) {
    this.exchange = props.exchange || null;
    this.symbol = props.symbol || null;
  }
};
module.exports = Market;
