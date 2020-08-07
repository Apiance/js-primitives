module.exports = function toCandle() {
  const Candle = require('../../Candle/Candle');

  const { c } = this;
  const opts = {};

  const optsProps = [null, 'exchange', 'symbol', 'timeframe', 'openTime', 'open', 'high','low', 'close', 'volume'];
  c.split('::').map((val, index, arr)=>{
    if(index === 0){
      if(val !== 'C') throw new Error('Wrong format');
      else return;
    }
    opts[optsProps[index]] = val;
  });
  return new Candle(opts);
}
