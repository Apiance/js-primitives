const get = require('lodash.get');
const Epoch = require('../Epoch/Epoch');
const Exchange = require('../Exchange/Exchange');
const Market = require('../Market/Market');
const calculateCloseTime = require('./utils/calculateCloseTime');
const defaultOpts = {
  exchange: null,
  symbol: null,
  interval: null,
  open: null,
  close: null,
  low: null,
  high: null,
  volume: { base: null, quote: null },
  trades: 0,
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
  if(opts[0] === '{'){
    return new Candle(JSON.parse(opts));
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
      exchange: opts.exchange || null,
      symbol: opts.symbol || null,
      type: opts.type || null,
      quote: opts.quote || null,
      base: opts.base || null
    });

    this.interval = (opts?.interval) ? get(opts, 'interval').toString() : defaultOpts.interval,

    this.open = (opts?.open) ? get(opts, 'open').toString() : defaultOpts.open,
    this.close = (opts?.close) ? get(opts, 'close').toString() : defaultOpts.close,
    this.low = (opts?.low) ? get(opts, 'low').toString() : defaultOpts.low,
    this.high = (opts?.low) ? get(opts, 'high').toString() : defaultOpts.high,

    this.volume = {
      base: (opts?.volume?.base) ? get(opts.volume, 'base').toString() : defaultOpts.volume.base,
      quote: (opts?.volume?.quote) ? get(opts.volume, 'quote').toString() : defaultOpts.volume.quote,
    };

    let openTime = opts.openTime;
    if(opts.timestamp) openTime = opts.timestamp;
    if(!openTime) openTime = Epoch.toISOString();

    this.openTime = new Epoch(openTime);

    this.openTime.set('millisecond','0');
    if(!this.interval || this.interval.slice(-1) !== 's'){
      this.openTime.set('second',"0");
    }

    const closeTime = (opts.closeTime) ? opts.closeTime : null;
    // Todo: calculate end time from ...
    this.closeTime = (closeTime) ? new Epoch(closeTime) : null;

    if(!this.closeTime) this.closeTime = calculateCloseTime(this);

    this.trades = (opts?.trades) ? parseInt(get(opts, 'trades')) : defaultOpts.trades;

    this.id = (opts?.id) ? get(opts, 'id').toString() : null;
  }
};
Candle.prototype.considerNewLastPrice = require('./methods/considerNewLastPrice');
Candle.prototype.considerTradeId = require('./methods/considerTradeId');
Candle.prototype.isWithinInterval = require('./methods/isWithinInterval');
Candle.prototype.toCompressed = require('./methods/toCompressed');
Candle.prototype.toZCandle = require('./methods/toZCandle');
Candle.prototype.toJSON = require('./methods/toJSON');
Candle.prototype.getId = require('./methods/getId');
module.exports = Candle;
