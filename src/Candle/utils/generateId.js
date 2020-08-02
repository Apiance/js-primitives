const Epoch = require('../../Epoch/Epoch');

module.exports = function generateId(market, timeframe, epoch){
  const year = epoch.format('YYYY');
  const month =  epoch.format('MM');
  const day =  epoch.format('DD');
  return `${market.exchange}/${market.symbol}/${timeframe}/${year}/${month}/${day}/${epoch.toString()}`;
}
