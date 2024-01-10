import add from "./methods/add.js";
import endOf from "./methods/endOf.js";
import format from "./methods/format.js";
import get from "./methods/get.js";
import set from "./methods/set.js";
import startOf from "./methods/startOf.js";
import subtract from "./methods/subtract.js";
import to from "./methods/to.js";
import toTimestamp from "./methods/toTimestamp.js";
import toJSON from "./methods/toJSON.js";
import toString from "./methods/toString.js";
import inspect from "./methods/inspect.js";

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

Epoch.prototype.add = add
Epoch.prototype.endOf = endOf
Epoch.prototype.format = format
Epoch.prototype.inspect = inspect
Epoch.prototype.get = get
Epoch.prototype.set = set
Epoch.prototype.startOf = startOf
Epoch.prototype.subtract = subtract
Epoch.prototype.to = to
Epoch.prototype.toString =toString
Epoch.prototype.toJSON = toJSON
Epoch.prototype.toTimestamp = toTimestamp

export default Epoch;
