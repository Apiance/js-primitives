import computeCandleId from '../utils/computeCandleId.js';
export default function toCompressed() {
    const {market, interval, openTime, open, close, low, high, volume, trades} = this;
    let id = this.id;
    if (id === null) {
        id = computeCandleId({
            toCompressed: () => {
                return `C::${market}::${interval}::${openTime}::${open}::${high}::${low}::${close}`;
            }
        });
        this.id = id;
    }
    let compressed = `C::${market}::${interval}::${openTime}::${id}::${open}::${high}::${low}::${close}`;

    if (volume && (volume.quote || volume.base)) {
        const {base, quote} = volume;
        compressed += `::${(base) ? base : ''}-${(quote) ? quote : ''}`;
    }

    if (trades) {
        compressed += `::${trades}`;
    }


    return compressed;
}
