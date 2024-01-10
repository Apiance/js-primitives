import fromString from "./utils/fromString.js";
import toCompressed from "./methods/toCompressed.js";
import toJSON from "./methods/toJSON.js";
import toObject from "./methods/toObject.js";
import toString from "./methods/toString.js";
import MARKET_TYPES from "./MARKET_TYPES.js";
import getTypeFromSymbolExchange from "./utils/getTypeFromSymbolExchange.js";
import detectQuoteAndBaseFromExchangeSymbolType from "./utils/detectQuoteAndBaseFromExchangeSymbolType.js";

class Market {

    /**
     * @constructor
     * @param {String} props.exchange
     * @param {String} props.symbol
     * @param {String} props.type
     * @param {String} props.id
     * @param {String} props.name
     * @param {String} props.description
     * @param {String} props.quote
     * @param {String} props.base
     *
     * @returns {Market}
     */
    constructor(props = {}) {

        if (!props) throw new Error('Expected props to create Market');
        if (props.constructor === String) {
            return fromString(props);
        }
        this.exchange = (props.exchange) ? props.exchange.toString().toUpperCase() : null;
        this.symbol = (props.symbol) ? props.symbol.toString().toUpperCase() : null;

        this.type = (props.type) ? props.type.toString().toUpperCase() : null

        this.quote = null;
        this.base = null;

        if (props.quote || props.base) {
            let {quote, base} = props;
            this.base = (base) ? base : (props.symbol.split(quote)[0].toString().toUpperCase())
            this.quote = (quote) ? quote : (props.symbol.split(base)[1].toString().toUpperCase())
        }


        // Auto-detect type if not provided
        if (!this.type && this.exchange && this.symbol) {
            this.type = getTypeFromSymbolExchange(this.exchange, this.symbol);
        }

        // Auto-detect quote and base if not provided
        if (!this.quote && this.symbol) {
            let {quote, base} = detectQuoteAndBaseFromExchangeSymbolType(this.exchange, this.symbol, this.type);
            this.quote = quote;
            this.base = base;
        }

    }
}

Market.MARKET_TYPES = MARKET_TYPES;
Market.prototype.toCompressed = toCompressed;
Market.prototype.toJSON = toJSON;
Market.prototype.toObject = toObject;
Market.prototype.toString = toString;

export default Market;
