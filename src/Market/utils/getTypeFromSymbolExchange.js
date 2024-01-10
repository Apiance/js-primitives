/**
 * @function getTypeFromSymbolExchange
 * @description Get the type of market from the symbol and exchange
 * @param exchange
 * @param symbol
 */
export default function getTypeFromSymbolExchange(exchange, symbol){
    if(!exchange) throw new Error('Expected exchange to get type from symbol')
    if(!symbol) throw new Error('Expected symbol to get type from symbol')
    switch (exchange){
        case "FTX":
            // if symbol has `-` and `PERP` then it's a perp, otherwise it's a spot
            return (symbol.indexOf('-') !== -1 && symbol.indexOf('PERP') !== -1) ? 'PERP' : 'SPOT';
        case "BINANCE":
        case "BYBIT":
        default:
            // if symbol has `-` then it's a spot, otherwise it's a perp
            return (symbol.indexOf('-') !== -1) ? 'SPOT' : 'PERP';
    }

}
