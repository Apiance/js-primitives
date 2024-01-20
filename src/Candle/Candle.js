import getId from "./methods/getId.js";
import toJSON from "./methods/toJSON.js";
import toZCandle from "./methods/toZCandle.js";
import toCompressed from "./methods/toCompressed.js";
import isWithinInterval from "./methods/isWithinInterval.js";
import considerTradeId from "./methods/considerTradeId.js";
import considerNewLastPrice from "./methods/considerNewLastPrice.js";
import Epoch from "../Epoch/Epoch.js";
import Market from "../Market/Market.js";
import calculateCloseTime from "./utils/calculateCloseTime.js";
import ZCandle from "../ZCandle/ZCandle.js";
import getPath from "./methods/getPath.js";

const defaultOpts = {
  exchange: null,
  symbol: null,
  interval: null,
  open: null,
  close: null,
  low: null,
  high: null,
  volume: { base: null, quote: null },
  trades: '0',
  timestamp: null,
};
const fromZCandle = (opts) => {
  // We put it here to avoid circ dependency
  if(opts.constructor !== ZCandle) throw new Error('Cannot fromZCandle: Is not a ZCandle');
  return opts.toCandle();
}
const fromString = (opts) =>{
  if(!opts.slice(0,3) === 'C::'){
    throw new Error('Unrecognized pattern');
  }
  if(opts[0] === '{'){
    return new Candle(JSON.parse(opts));
  }
  return new ZCandle({c: opts}).toCandle();
}
class Candle {
  constructor(opts = {...defaultOpts}) {
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

    this.interval = opts?.interval?.toString() ?? defaultOpts.interval;
    this.open = opts?.open?.toString() ?? defaultOpts.open;
    this.close = opts?.close?.toString() ?? defaultOpts.close;
    this.low = opts?.low?.toString() ?? defaultOpts.low;
    this.high = opts?.high?.toString() ?? defaultOpts.high;

    this.volume = {
        base: opts?.volume?.base?.toString() ?? defaultOpts.volume.base,
        quote: opts?.volume?.quote?.toString() ?? defaultOpts.volume.quote,
    }



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


    this.trades = (opts?.trades) ? opts.trades.toString() : defaultOpts.trades;
    this.id = (opts?.id) ? opts.id.toString() : null;
  }
};
Candle.prototype.considerNewLastPrice = considerNewLastPrice;
Candle.prototype.considerTradeId = considerTradeId;
Candle.prototype.isWithinInterval = isWithinInterval;
Candle.prototype.toCompressed = toCompressed;
Candle.prototype.toZCandle = toZCandle;
Candle.prototype.toJSON = toJSON;
Candle.prototype.getId = getId;
Candle.prototype.getPath = getPath;

export default Candle;
