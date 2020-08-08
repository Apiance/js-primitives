class ZCandle {
  constructor(props) {
    if(props){
      if(props.constructor === String){
        return ZCandle.fromString(props);
      }else if(props.constructor === Object && props.c || props.constructor === ZCandle) {
        this.c = props.c;
      } else {
        const fromCandle = ZCandle.fromCandle(props);
        if(fromCandle) return fromCandle;
        return ZCandle.fromObject(props);
      }
    }
  }
  toString(){
    return this.c.toString();
  }
}
ZCandle.fromString = function(str) {
  if(!str.slice(0,3) === 'C::'){
    throw new Error('Unrecognized pattern');
  }
  return new ZCandle({c: str});
}
ZCandle.fromCandle = function(candle) {
  return new ZCandle(candle.toCompressed())
}
ZCandle.fromObject = function(object) {
  let z = `C::${object.market}::${object.openTime}::${object.open}::${object.high}::${object.low}::${object.close}`;
  if(object.volume){
    z += `::${object.volume}`;
    if(object.trades) {
      z += `::${object.trades}`;
    }
  }
  return new ZCandle(z)
}

ZCandle.prototype.toCandle = require('./methods/toCandle');
module.exports = ZCandle;
