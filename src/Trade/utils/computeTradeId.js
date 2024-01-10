const crypto = require('crypto');
function computeTradeId(trade){
    const hash = crypto.createHash('sha1').update(trade.toCompressed(), 'utf-8').digest('hex').slice(0,8);
    return hash;
};
module.exports = computeTradeId
