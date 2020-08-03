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
    console.error(`Unexpected missing price: ${lastPrice} (amt : ${amount})`);
    return false;
  }
  this.close = lastPrice;
  if(isString(amount)) amount = Number(amount);
  if(isNum(amount)){
    if(this.volume===null){
      this.volume=0;
    }
    this.volume = new Big(this.volume).plus(amount).toString();
  }else {
    console.error(`Unexpected missing amount: ${amount} (last: ${lastPrice}`);
  }

  if(this.open===null) this.open = lastPrice;

  if(lastPrice>this.high || this.high === null) this.high = lastPrice;
  if(lastPrice<this.low || this.low === null) this.low = lastPrice;

  return true;
}
