import Keys from "../../Keys/Keys.js";

export default function addKeys(keys){

  if(keys.constructor !== Keys){
    throw new Error('Not a keys');
  }
  if(this.keys[keys.name]) throw new Error(`Already existing keys for ${keys.name}`);

  this.keys[keys.name] = keys;
};
