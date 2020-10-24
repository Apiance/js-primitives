class ZCandle {
  constructor(props) {
    if(props){
      if(props.constructor === String){
        return ZCandle.fromString(props);
      }else if(props.constructor === Object && props.c || props.constructor === ZCandle) {
        this.c = props.c;
      } else {
        try {
          const fromCandle = ZCandle.fromCandle(props);
          return fromCandle;
        }
        catch (e) {
          return ZCandle.fromObject(props);
        }
      }
    }
  }
  toString(){
    return this.c.toString();
  }
}
ZCandle.fromString = function(str) {
  console.log({str});
  if(!str.slice(0,3) === 'C::'){
    throw new Error('Unrecognized pattern');
  }
  if(str[0] === '{'){
    return new ZCandle(JSON.parse(str));
  }
  return new ZCandle({c: str});
}
ZCandle.fromCandle = function(candle) {
  return new ZCandle(candle.toCompressed())
}
ZCandle.fromObject = function(object) {
  let z = `C::${object.market}::${object.interval}::${object.openTime}::${object.open}::${object.high}::${object.low}::${object.close}`;
  if(object.quoteVolume){
    z += `::${object.quoteVolume}`;
    if(object.trades) {
      z += `::${object.trades}`;
    }
  }
  return new ZCandle(z)
}

ZCandle.prototype.toCandle = require('./methods/toCandle');
module.exports = ZCandle;
