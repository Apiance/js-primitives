const Epoch = require('../../Epoch/Epoch');

module.exports = function generateId(exchange, symbol, timeframe, epoch){
  const year = epoch.format('YYYY');
  const month =  epoch.format('MM');
  const day =  epoch.format('DD');
  return `${exchange}/${symbol}/${timeframe}/${year}/${month}/${day}/${epoch.toString()}`;
}
