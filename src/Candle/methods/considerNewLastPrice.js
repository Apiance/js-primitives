const MissingParameterError = require('../errors/MissingParameter')
const { Big } = require('big.js');
const isNum = require('../utils/isNum')
const isString = require('../utils/isString')

/**
 * Used to update the candle by considering last price and apply it to the candle
 * @param lastPrice
 * @param amount
 * @return {Boolean}
 */

module.exports = function considerNewLastPrice(lastPrice, amount = null, tradesQty = 0){
  if(!lastPrice){
    throw new MissingParameterError('lastPrice', {lastPrice, amount});
  }
  this.close = lastPrice.toString();
  if(isString(amount)) amount = Number(amount);
  if(isNum(amount)){
    if(this.volume===null) this.volume={ base: 0, quote: 0 };
    if(this.volume.base===null) this.volume.base= 0;
    if(this.volume.quote===null) this.volume.quote= 0;

    this.volume.base = new Big(this.volume.base).plus(amount).toString();
    this.volume.quote = new Big(this.volume.quote).plus(amount*lastPrice).toString();
  }else {
    // throw new MissingParameterError('amount', {lastPrice, amount});
  }

  if(this.open===null) this.open = lastPrice.toString();

  if(lastPrice>this.high || this.high === null) this.high = lastPrice.toString();
  if(lastPrice<this.low || this.low === null) this.low = lastPrice.toString();

  if(this.trades === null) this.trades = '0';
  if(tradesQty !== null){
    this.trades = new Big(this.trades).plus(tradesQty).toString();
  }

  return true;
}
