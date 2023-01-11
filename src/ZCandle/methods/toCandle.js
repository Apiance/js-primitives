module.exports = function toCandle() {
  const Candle = require('../../Candle/Candle');

  const {c} = this;
  const opts = {};

  const optsProps = [null, 'exchange', 'symbol', 'interval', 'openTime', "hash", 'open', 'high', 'low', 'close', 'volume', 'trades'];
  c.split('::').map((val, index, arr) => {
    if (index === 0) {
      if (val !== 'C') throw new Error('Wrong format');
      else return;
    }
    let propName = optsProps[index];
    // if we have trades set but not volume.
    if(propName === 'volume' && val.split('-').length !== 2) propName = 'trades';
    if (propName === 'volume') {
      let [base, quote] = val.split('-');
        opts.volume = {}
        if(base !== '') opts.volume.base = base;
        if(quote !== '') opts.volume.quote = quote;
    } else {
      opts[propName] = val;
    }
  });
  return new Candle(opts);
}
