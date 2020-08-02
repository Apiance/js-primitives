const Trade = require('../../Trade/Trade');

module.exports = function toTrade() {
  const { z } = this;
  const opts = {};

  const optsProps = [null, 'exchange', 'symbol', 'timestamp', 'id', 'rate', 'quantity','side', 'buyOrderId', 'sellOrderId'];
  z.split('::').map((val, index, arr)=>{
    if(index === 0){
      if(val !== 'Z') throw new Error('Wrong format');
      else return;
    }
    // BUY / SELL transform
    if(index === 7){
      opts[optsProps[index]] = (val === '1') ? 'BUY' : "SELL";
    }else{
      opts[optsProps[index]] = val;
    }
  });
  return new Trade(opts);
}
