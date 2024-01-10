export default function detectQuoteAndBaseFromExchangeSymbolType(exchange,symbol,type){
    if(!exchange) throw new Error('Expected exchange to get type from symbol')
    if(!symbol) throw new Error('Expected symbol to get type from symbol')
    if(!type) throw new Error('Expected type to get type from symbol')

    let quote = null;
    let base = null;

    switch (exchange){
        case "FTX":
            // if symbol has `-` and `PERP` then it's a perp, otherwise it's a spot
            if(symbol.indexOf('-') !== -1 && symbol.indexOf('PERP') !== -1){
                quote = 'USD'
                base = symbol.split('-')[0];
            }else{
                quote = symbol.split('-')[1];
                base = symbol.split('-')[0];
            }
            break;
        case "BINANCE":
        case "BYBIT":
        default:
            // if symbol has `-` then it's a spot, and the quote is the second part of the symbol
            // otherwise it's a perp, and the quote is in the name of the symbol (usually USDT/USDC)
            // So we need to pattern match the symbol to get the quote

            const spotPattern = /([A-Z]+)-([A-Z]+)/;
            const perpPattern = /([A-Z]+)(USDT|USDC|BTC|ETH)/;


            switch (type){
                case 'SPOT':
                    quote = symbol.match(spotPattern)[2];
                    base = symbol.match(spotPattern)[1];
                    break;
                case 'PERP':
                    quote = symbol.match(perpPattern)[2];
                    base = symbol.match(perpPattern)[1];
                    break;
                default:
                    throw new Error('Expected type to be SPOT or PERP');
            }
    }

    return {quote, base};
}
