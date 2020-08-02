const _ = require('lodash');
const Epoch = require('../Epoch/Epoch');
const generateId = require('./utils/generateId');
const Exchange = require('../Exchange/Exchange');
const Market = require('../Market/Market');
const calculateCloseTime = require('./utils/calculateCloseTime');
const defaultOpts = {
  exchange: null,
  symbol: null,
  timeframe: null,
  open: null,
  close: null,
  low: null,
  high: null,
  volume: null,
  timestamp: null,
  $meta: {
    id: null,
    rcvTimestamp: null,
    endTimestamp: null,
    startTimestamp: null,
  }
};

class Candle {
  constructor(opts = defaultOpts, logger = console) {
    let exchange = new Exchange({ name: opts.exchange || defaultOpts.exchange });

    this.market = new Market(opts.market || {
      exchange,
      symbol: opts.symbol || defaultOpts.symbol
    });

    this.timeframe = _.get(opts, 'timeframe', defaultOpts.timeframe);

    this.open = _.get(opts, 'open', defaultOpts.open);
    this.close = _.get(opts, 'close', defaultOpts.close);
    this.low = _.get(opts, 'low', defaultOpts.low);
    this.high = _.get(opts, 'high', defaultOpts.high);
    this.volume = _.get(opts, 'volume', defaultOpts.volume);

    const openTime = (opts.openTime)
      ? opts.openTime
      : (opts.timestamp)
        ? opts.timestamp
        : Epoch.toISOString();

    this.openTime = new Epoch(openTime);

    this.openTime.date.setMilliseconds(0);
    if(!this.timeframe || this.timeframe.slice(-1) !== 's'){
      this.openTime.date.setSeconds(0);
    }

    const closeTime = (opts.closeTime) ? opts.closeTime : null;
    // Todo: calculate end time from ...
    this.closeTime = (closeTime) ? new Epoch(closeTime) : null;

    this.$id = generateId(this.market, this.timeframe, this.openTime);
    if(!this.closeTime) this.closeTime = calculateCloseTime(this);
  }
};
Candle.prototype.toCompressed = require('./methods/toCompressed');
module.exports = Candle;
