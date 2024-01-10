import addKeys from "./methods/addKeys.js";
import getKeys from "./methods/getKeys.js";

class KeyChain {
  constructor() {
    this.keys = {};
  }
};
KeyChain.prototype.addKeys = addKeys
KeyChain.prototype.getKeys = getKeys;

export default KeyChain;
