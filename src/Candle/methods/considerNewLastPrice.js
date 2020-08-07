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

module.exports = function considerNewLastPrice(lastPrice, amount = null){
  if(!lastPrice){
    throw new MissingParameterError('lastPrice', {lastPrice, amount});
  }
  this.close = lastPrice;
  if(isString(amount)) amount = Number(amount);
  if(isNum(amount)){
    if(this.volume===null){
      this.volume=0;
    }
    this.volume = new Big(this.volume).plus(amount).toString();
  }else {
    // throw new MissingParameterError('amount', {lastPrice, amount});
  }

  if(this.open===null) this.open = lastPrice;

  if(lastPrice>this.high || this.high === null) this.high = lastPrice;
  if(lastPrice<this.low || this.low === null) this.low = lastPrice;

  return true;
}
