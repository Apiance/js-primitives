function toJSON(){
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
        hash,
        trades
    } = this;
    return {
        market: market.toJSON(),
        interval,
        open,
        close,
        low,
        high,
        volume,
        openTime: openTime.toJSON(),
        hash,
        closeTime: closeTime.toJSON(),
        trades
    }
};
module.exports = toJSON;
