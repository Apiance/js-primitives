import computeCandleId from '../utils/computeCandleId.js';

function toJSON() {
    const {
        market,
        interval,
        open,
        close,
        low,
        high,
        volume,
        openTime,
        closeTime,
        trades
    } = this;
    let id = this.id;

    if (id === null) {
        id = computeCandleId({
            toCompressed: () => {
                return `C::${market}::${interval}::${openTime}::${open}::${high}::${low}::${close}`;
            }
        });
        this.id = id;
    }
    return {
        market: market.toJSON(),
        interval,
        open,
        close,
        low,
        high,
        volume,
        openTime: openTime.toJSON(),
        id,
        closeTime: closeTime.toJSON(),
        trades
    }
};
export default toJSON;
