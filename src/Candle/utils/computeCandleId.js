const crypto = require('crypto');
function computeCandleId(candle){
    const hash = crypto.createHash('sha1');
    const data = hash.update(candle.toCompressed(), 'utf-8');
    const digest = data.digest();
    const candleId = `C`+digest.slice(0, 3).toString('hex').toUpperCase()+digest.slice(-3).toString('hex').toUpperCase()
    return candleId
};
module.exports = computeCandleId
