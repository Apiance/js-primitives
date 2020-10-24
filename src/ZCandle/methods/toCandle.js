module.exports = function toCandle() {
  const Candle = require('../../Candle/Candle');

  const {c} = this;
  const opts = {};

  const optsProps = [null, 'exchange', 'symbol', 'interval', 'openTime', 'open', 'high', 'low', 'close', 'volume', 'trades'];
  c.split('::').map((val, index, arr) => {
    if (index === 0) {
      if (val !== 'C') throw new Error('Wrong format');
      else return;
    }
    const propName = optsProps[index];
    if (propName === 'volume') {
      let splittedVal = val.split('-');
      opts.volume = {
        base: splittedVal[0],
        quote: splittedVal[1]
      }
    } else {
      opts[propName] = val;
    }
  });
  return new Candle(opts);
}
