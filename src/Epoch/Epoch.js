class Epoch {
  constructor(props) {
    if (props) {
      if (props.constructor === String) {
        return Epoch.fromString(props);
      } else if (props.constructor === Number) {
        return Epoch.fromNumber(props);
      }
    }
    this.date = (props && props.date) ? props.date : new Date();
  }
};

Epoch.fromNumber = function fromNumber(numberParam) {
  // if(numberParam < 9.9e9){
  if(numberParam < 9.9e9){
    // we assume it is s and transform to ms
    // - CAVEAT: Fail on msec < 1970-04-26 (interpret as sec)
    // - CAVEAT: Fail on sec > 2255-03-14 (interpret as ms)
    return Epoch.fromNumber(numberParam * 1000)
  }
  this.date = new Date(numberParam);
  return new Epoch({ date: this.date });
};
Epoch.fromString = function fromString(strParam) {
  this.date = new Date(strParam);
  return new Epoch({ date: this.date });
};
Epoch.prototype.inspect = require('./methods/inspect');
Epoch.prototype.to = require('./methods/to');
Epoch.prototype.toString = require('./methods/toString');
Epoch.prototype.toTimestamp = require('./methods/toTimestamp');
module.exports = Epoch;
