class KeyChain {
  constructor() {
    this.keys = {};
  }
};
KeyChain.prototype.addKeys = require('./methods/addKeys');
KeyChain.prototype.getKeys = require('./methods/getKeys');
module.exports = KeyChain;
