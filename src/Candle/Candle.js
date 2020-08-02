const _ = require('lodash');
const Epoch = require('../Epoch/Epoch');
const generateId = require('./utils/generateId');

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
  $meta:{
    id: null,
    rcvTimestamp:null,
    endTimestamp:null,
    startTimestamp:null,
  }
};

class Candle {
  constructor(opts = defaultOpts, logger = console) {
    this.exchange = _.get(opts, 'exchange', defaultOpts.exchange);
    this.symbol = _.get(opts, 'symbol', defaultOpts.symbol);

    this.timeframe = _.get(opts, 'timeframe', defaultOpts.timeframe);

    this.open = _.get(opts, 'open', defaultOpts.open);
    this.close = _.get(opts, 'close', defaultOpts.close);
    this.low = _.get(opts, 'low', defaultOpts.low);
    this.high = _.get(opts, 'high', defaultOpts.high);
    this.volume = _.get(opts, 'volume', defaultOpts.volume);

    this.timestamp = new Epoch(_.get(opts, 'timestamp', Epoch.toISOString()));

    this.$meta = {
      rcvTimestamp:  _.get(opts.$meta, 'rcvTimestamp', defaultOpts.$meta.rcvTimestamp),
      startTimestamp : _.get(opts.$meta, 'startTimestamp', defaultOpts.$meta.startTimestamp),
      endTimestamp : _.get(opts.$meta, 'endTimestamp', defaultOpts.$meta.endTimestamp),
      id: generateId(this.exchange, this.symbol, this.timeframe, this.timestamp)
    }
  }
};
module.exports = Candle;
