const fromString = (value) =>{
  const [exchange, symbol] = value.split('::');
  return new Market({exchange, symbol});
}
class Market {
  constructor(props = {}) {
    if(props.constructor === String){
      return fromString(props);
    }
    if(!props) throw new Error('Expected props to create Market');
    this.exchange = props.exchange.toString().toUpperCase() || null;
    this.symbol = props.symbol.toString().toUpperCase() || null;

    if(props.quoteSymbol) {
      this.quoteSymbol = props.quoteSymbol;
    }
    if(props.baseSymbol) {
      this.baseSymbol = props.baseSymbol;
    }
  }
  toObject(){
    return this;
  }
  toJSON(){
    return this.toString();
  }
  toString(){
    return `${this.exchange.toString()}::${this.symbol}`;
  }
};
module.exports = Market;
