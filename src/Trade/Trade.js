const Exchange = require('../Exchange/Exchange');
const Market = require('../Market/Market');
const Epoch = require('../Epoch/Epoch');
class Trade {
  /**
   *
   * @param props
   * @param {Date.toUTC} props.timestamp - UTC ISO Timestamp
   */
  constructor(props = {}) {
    let exchange = new Exchange({name: props.exchange || null})

    this.market = new Market({
      exchange,
      symbol: props.symbol
    });

    this.id = props.id || null;

    this.rate = props.rate || null;
    this.quantity = props.quantity || null;
    this.side = props.side || null;

    this.buyOrderId = props.buyOrderId || null;
    this.sellOrderId = props.sellOrderId || null;

    this.timestamp = new Epoch(props.timestamp || null);
  }
};
Trade.prototype.toCompressed = require('./methods/toCompressed')
Trade.prototype.toID = require('./methods/toID')
Trade.prototype.toJSON = require('./methods/toJSON')
module.exports = Trade;
