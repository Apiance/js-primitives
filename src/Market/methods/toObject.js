export default function toObject(){
    const { exchange, symbol, type, quote, base } = this;
    const obj = {
        exchange, symbol, type, quote, base
    };
    return obj;
}
