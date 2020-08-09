const _ = require('lodash');
const Epoch = require('../Epoch/Epoch');
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
};
const fromZCandle = (opts) => {
  // We put it here to avoid circ dependency
  const ZCandle = require('../ZCandle/ZCandle');
  if(opts.constructor !== ZCandle) throw new Error('Cannot fromZCandle: Is not a ZCandle');
  return opts.toCandle();
}
const fromString = (opts) =>{
  const ZCandle = require('../ZCandle/ZCandle');
  if(!opts.slice(0,3) === 'C::'){
    throw new Error('Unrecognized pattern');
  }
  return new ZCandle({c: opts}).toCandle();
}
class Candle {
  constructor(opts = defaultOpts) {
    if(opts.constructor === String){
      return fromString(opts)
    }else if(opts.constructor !== Object){
      return fromZCandle(opts)
    }

    this.market = new Market(opts.market || {
      exchange: opts.exchange || defaultOpts.exchange,
      symbol: opts.symbol || defaultOpts.symbol,
      quoteSymbol: opts.quoteSymbol || null,
      baseSymbol: opts.baseSymbol || null
    });

    this.timeframe = _.get(opts, 'timeframe', defaultOpts.timeframe);

    this.open = _.get(opts, 'open', defaultOpts.open);
    this.close = _.get(opts, 'close', defaultOpts.close);
    this.low = _.get(opts, 'low', defaultOpts.low);
    this.high = _.get(opts, 'high', defaultOpts.high);

    // Volume is always expressed in quoteVolume (like other price value are)
    this.volume = _.get(opts, 'volume', defaultOpts.volume);

    let openTime = opts.openTime;
    if(opts.timestamp) openTime = opts.timestamp;
    if(!openTime) openTime = Epoch.toISOString();

    this.openTime = new Epoch(openTime);

    this.openTime.set('millisecond','0');
    if(!this.timeframe || this.timeframe.slice(-1) !== 's'){
      this.openTime.set('second',"0");
    }

    const closeTime = (opts.closeTime) ? opts.closeTime : null;
    // Todo: calculate end time from ...
    this.closeTime = (closeTime) ? new Epoch(closeTime) : null;

    if(!this.closeTime) this.closeTime = calculateCloseTime(this);

    if(opts.trades) this.trades = opts.trades;
  }
};
Candle.prototype.considerNewLastPrice = require('./methods/considerNewLastPrice');
Candle.prototype.isWithinTimeframe = require('./methods/isWithinTimeframe');
Candle.prototype.toCompressed = require('./methods/toCompressed');
Candle.prototype.toZCandle = require('./methods/toZCandle');
Candle.prototype.getId = require('./methods/getId');
module.exports = Candle;
