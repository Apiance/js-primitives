import Market from "../Market.js";
import getTypeFromSymbolExchange from "./getTypeFromSymbolExchange.js";
import detectQuoteAndBaseFromExchangeSymbolType from "./detectQuoteAndBaseFromExchangeSymbolType.js";


const fromString = (value) =>{
    // String is of format: EXCHANGE::SYMBOL, where SYMBOL is of format:
    // [QUOTE]-[BASE] (e.g. BTC-USD, refer to a spot market)
    // [QUOTE][BASE] (e.g. BTCUSDT, refer to a perp market)
    // [QUOTE]-[BASE]-PERP (e.g. BTC-USDT-PERP, refer to a perp market)

    // Split the string into exchange and symbol
    const [exchange, symbol] = value.split('::');

    let type = getTypeFromSymbolExchange(exchange, symbol);

    let {quote, base} = detectQuoteAndBaseFromExchangeSymbolType(exchange, symbol, type);

    // Return a new Market object
    return new Market({exchange, symbol, type, quote, base});
}

export default fromString;
