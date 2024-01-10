import Trade from '../../Trade/Trade.js';
export default function toTrade() {
  const { z } = this;
  const opts = {};
  const optsProps = [null, 'exchange', 'market', 'timestamp', 'id', 'rate', 'quantity','side', 'buyOrderId', 'sellOrderId'];
  z.split('::').map((val, index, arr)=>{
    switch (index){
      case 0:
        if(val !== 'Z') throw new Error('Wrong format');
        else return;
      case 1:
        opts['market'] = `${val}`;
        break
      case 2:
        opts['market'] += `::${val}`;
        break
        // BUY / SELL transform
      case 7:
        opts[optsProps[index]] = (val === '1') ? 'BUY' : "SELL";
        break;
      default:
        opts[optsProps[index]] = val;
    }

  });
  return new Trade(opts);
}
