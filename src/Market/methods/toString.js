import MARKET_TYPES from "../MARKET_TYPES.js";

export default function toString(){
    // Return with format: EXCHANGE::SYMBOL, where SYMBOL is of format:
    // [QUOTE]-[BASE] (e.g. BTC-USD, refer to a spot market)
    // [QUOTE][BASE] (e.g. BTCUSDT, refer to a perp market)
    // [QUOTE]-[BASE]-PERP (e.g. BTC-USDT-PERP, refer to a perp market)

    // Split the string into exchange and symbol
    const {exchange, symbol, type} = this;
    let {quote, base} = this;
    // Return a new Market object
    let str = `${exchange}::${symbol}`;
    if(quote && base){
        str = `${exchange}::${base}${quote}`;
    }

    switch (type){
        case MARKET_TYPES.PERP:
            if(exchange === 'FTX'){
                str = `${exchange}::${base}-PERP`;
            }else{
                str = `${exchange}::${base}${quote}`;
            }
            break;
        case MARKET_TYPES.SPOT:
            if(exchange === 'FTX'){
                str = `${exchange}::${base}-${quote}`;
            } else {
                str = `${exchange}::${base}-${quote}`;
            }
            break;
        default:
            throw new Error('Expected type to be SPOT or PERP');
    }
    return str;

}
