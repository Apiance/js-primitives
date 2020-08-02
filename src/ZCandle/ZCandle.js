class ZCandle {
  constructor(props) {
    if(props){
      if(props.constructor === String){
        return ZCandle.fromString(props);
      }else if(props.constructor === Object || props.constructor === ZCandle) {
        this.c = props.c;
      } else {
        return ZCandle.fromTrade(props);
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
ZCandle.fromTrade = function(candle) {
  return new ZCandle(candle.toCompressed())
}

ZCandle.prototype.toCandle = require('./methods/toCandle');
module.exports = ZCandle;
