const Market = require('../Market/Market');
const Epoch = require('../Epoch/Epoch');
// const computeTradeId
class Trade {
  /**
   *
   * @param props
   * @param {Date.toUTC} props.timestamp - UTC ISO Timestamp
   */
  constructor(props = {}) {
    this.market = new Market(props.market);


    this.rate = props.rate || null;
    this.quantity = props.quantity || null;
    this.side = props.side || null;

    this.buyOrderId = props.buyOrderId || null;
    this.sellOrderId = props.sellOrderId || null;

    this.timestamp = new Epoch(props.timestamp || null);
    this.id = props.id || null
  }
};
Trade.prototype.toCompressed = require('./methods/toCompressed')
Trade.prototype.toID = require('./methods/toID')
Trade.prototype.toJSON = require('./methods/toJSON')
Trade.prototype.toZTrade = require('./methods/toZTrade')
module.exports = Trade;
