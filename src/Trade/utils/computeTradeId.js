const crypto = require('crypto');
function computeTradeId(trade){
    const hash = crypto.createHash('sha1');
    const data = hash.update(trade.toCompressed(), 'utf-8');
    const digest = data.digest();
    const tradeId = `T`+digest.slice(0, 3).toString('hex').toUpperCase()+digest.slice(-3).toString('hex').toUpperCase()
    return tradeId
};
module.exports = computeTradeId
