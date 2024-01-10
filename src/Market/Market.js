const TYPES = require('./TYPES');
const fromString = (value) =>{
  const [exchange, symbol] = value.split('::');
  const splitted = symbol.split('-');
  if(splitted.length>1){

    if(exchange === 'FTX' && splitted[1] === 'PERP'){
      return new Market({exchange, symbol, quote: 'USD', base: splitted[0], type: TYPES.PERP });
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
// FIXME: The handling of FTX // PERP is suboptimal.
//  Refactorize me please <3
class Market {
  constructor(props = {}) {
    if(!props) throw new Error('Expected props to create Market');
    if(props.constructor === String){
      return fromString(props);
    }
    this.exchange = (props.exchange) ? props.exchange.toString().toUpperCase() : null;
    this.symbol = (props.symbol) ? props.symbol.toString().toUpperCase() : null;
    this.type = (props.type) ? props.type.toString().toUpperCase() : null;

    this.quote = null;
    this.base = null;

    if(props.quote || props.base){
      let { quote, base } = props;
      this.base = (base) ? base : (props.symbol.split(quote)[0].toString().toUpperCase())
      this.quote = (quote) ? quote : (props.symbol.split(base)[1].toString().toUpperCase())
    }

    if(this.exchange === 'FTX'){
      const splitted = this.symbol.split('-');
      if(splitted.length>1 && splitted[1]==='PERP'){
        this.type = TYPES.PERP;
        this.quote = 'USD';
        this.base = splitted[0];
      }
    }

  }
  toObject(){
    const { exchange, type, symbol, quote, base } = this;
    const obj = {
      exchange, type, symbol, quote, base
    };
    return obj;
  }
  toJSON(){
    return this.toObject();
  }
  toString(){
    let marketId = (this.base && this.quote) ? `${this.base}-${this.quote}` : this.symbol;

    if(this.type === TYPES.PERP && this.exchange === 'FTX'){
      return `${this.exchange.toString()}::${this.symbol}`
    }

    return (this.type) ? `${this.exchange.toString()}::${this.type}-${marketId}` : `${this.exchange.toString()}::${marketId}`;
  }
  toCompressed(){
    return this.toString();
  }
};
module.exports = Market;
