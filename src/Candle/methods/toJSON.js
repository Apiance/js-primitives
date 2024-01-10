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
        id,
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
        id,
        closeTime: closeTime.toJSON(),
        trades
    }
};
module.exports = toJSON;
