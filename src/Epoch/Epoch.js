class Epoch {
  constructor(props) {
    if (props) {
      if (props.constructor === String) {
        return Epoch.fromString(props);
      } else if (props.constructor === Number) {
        return Epoch.fromNumber(props);
      }
    }
    this.date = (props && props.date) ? props.date : Epoch.toISOString();
  }
  clone(){
    return new Epoch({date: this.date});
  }
};

Epoch.fromNumber = function fromNumber(numberParam) {
  if(numberParam > 9.9e12){
    // console.log('assume ns');
    return Epoch.fromNumber(numberParam / 1000000)
  }
  if(numberParam < 9.9e9){
    // console.log('assume sec');
    // we assume it is s and transform to ms
    // - CAVEAT: Fail on msec < 1970-04-26 (interpret as sec)
    // - CAVEAT: Fail on sec > 2255-03-14 (interpret as ms)
    return Epoch.fromNumber(numberParam * 1000)
  }
  return new Epoch({ date: new Date(numberParam).toISOString() });
};
Epoch.fromString = function fromString(strParam) {
  if(!Number.isNaN(Number(strParam))) return Epoch.fromNumber(Number(strParam));

  const date = new Date(strParam);
  return new Epoch({ date: date.toISOString() });
};
Epoch.toISOString = function toISOString() {
  return new Date().toISOString();
};
Epoch.Offset = {
  UTC: {
    _id: 'Z',
    _totalSeconds: 0
  }
};

Epoch.prototype.add = require('./methods/add');
Epoch.prototype.endOf = require('./methods/endOf');
Epoch.prototype.format = require('./methods/format');
Epoch.prototype.inspect = require('./methods/inspect');
Epoch.prototype.get = require('./methods/get');
Epoch.prototype.set = require('./methods/set');
Epoch.prototype.startOf = require('./methods/startOf');
Epoch.prototype.subtract = require('./methods/subtract');
Epoch.prototype.to = require('./methods/to');
Epoch.prototype.toString = require('./methods/toString');
Epoch.prototype.toJSON = require('./methods/toJSON');
Epoch.prototype.toTimestamp = require('./methods/toTimestamp');

module.exports = Epoch;
