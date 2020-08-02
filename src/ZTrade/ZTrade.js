class ZTrade {
  constructor(props) {
    if(props){
      if(props.constructor === String){
        return ZTrade.fromString(props);
      }else if(props.constructor === Object || props.constructor === ZTrade) {
        this.z = props.z;
      } else {
        return ZTrade.fromTrade(props);
      }
    }
  }
  toString(){
    return this.z.toString();
  }
}
ZTrade.fromString = function(str) {
  if(!str.slice(0,3) === 'Z::'){
    throw new Error('Unrecognized pattern');
  }
  return new ZTrade({z: str});
}
ZTrade.fromTrade = function(trade) {
  return new ZTrade(trade.toCompressed())
}

ZTrade.prototype.toTrade = require('./methods/toTrade');
module.exports = ZTrade;
