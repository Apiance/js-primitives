import crypto from 'crypto'
import MissingParameterError from '../errors/MissingParameter.js'
import isString from '../utils/isString.js'

/**
 * Used to update the candle by considering last price and apply it to the candle
 * @param lastPrice
 * @param amount
 * @return {Boolean}
 */

function incrementalHash(prevHash, currentIdHash) {
  const combined = Buffer.concat([prevHash, currentIdHash]);
  const newHash = crypto.createHash('sha1').update(combined).digest('hex');
  return newHash
}


export default function considerTradeId(tradeId){
  if(tradeId === undefined) throw new MissingParameterError('tradeId')
  if(!isString(tradeId)) throw new TypeError('tradeId must be a string');

  if(this.id === null){
    this.id = Buffer.alloc(8);
  }

  const combinedHash = incrementalHash(Buffer.from(this.id, 'hex'), Buffer.from(tradeId, 'hex'));
  this.id = combinedHash.slice(0,8).toString('hex');
}
