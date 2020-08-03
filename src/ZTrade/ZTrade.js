class ZTrade {
  constructor(props) {
    if(props){
      if(props.constructor === String){
        return ZTrade.fromString(props);
      }else if(props.constructor === Object && props.z || props.constructor === ZTrade) {
        this.z = props.z;
      } else {
        if(props.toCompressed) return ZTrade.fromTrade(props);
        return ZTrade.fromObject(props);
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
ZTrade.fromObject = function(object) {
  const z = `Z::${object.market}::${object.timestamp}::${object.id}::${object.rate}::${object.quantity}::${object.side}::${object.buyOrderId}::${object.sellOrderId}`;
  return new ZTrade(z)
}

ZTrade.prototype.toTrade = require('./methods/toTrade');
module.exports = ZTrade;
