const logger = require('../../logger')();
const Keys = require('../../Keys/Keys');
module.exports = function addKeys(keys){

  if(keys.constructor !== Keys){
    throw new Error('Not a keys');
  }
  if(this.keys[keys.name]) throw new Error(`Already existing keys for ${keys.name}`);

  logger.trace(`KeyChain - Adding keys for ${keys.name}`);
  this.keys[keys.name] = keys;
};
