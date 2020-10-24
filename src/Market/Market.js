const fromString = (value) =>{
  const [exchange, market] = value.split('::');
  const splitted = market.split('-');
  if(splitted.length>1){
    if(exchange === 'FTX' && splitted[1] === 'PERP'){
      return new Market({exchange, symbol: market});
    }
    const [quote, base, type] = splitted.reverse();
    return new Market({exchange, type, quote, base});
  }else{
    return new Market({exchange, symbol:splitted[0]});
  }
}

/**
 * Can be init either via Symbol or full
 *
 *
 */
class Market {
  constructor(props = {}) {
    if(props.constructor === String){
      return fromString(props);
    }
    if(!props) throw new Error('Expected props to create Market');
    this.exchange = (props.exchange) ? props.exchange.toString().toUpperCase() : null;
    this.type = (props.type) ? props.type.toString().toUpperCase() : null;
    this.symbol = (props.symbol) ? props.symbol.toString().toUpperCase() : null;
    this.quote = (props.quote) ? props.quote.toString().toUpperCase() : null;
    this.base = (props.base) ? props.base.toString().toUpperCase() : null;
  }
  toObject(){
    return this;
  }
  toJSON(){
    return this.toString();
  }
  toString(){
    if(this.symbol && !this.type){
      return `${this.exchange.toString()}::${this.symbol}`;
    }else{
      let marketId = `${this.quote}-${this.base}`;
      if(this.type){
        marketId = `${this.type}-${marketId}`;
      }
      return `${this.exchange.toString()}::${marketId}`;
    }
  }
};
module.exports = Market;
