let getTimeframeDurationInMilliseconds = require('../utils/getTimeframeDurationInMilliseconds');
const { longs, shorts } = require('../constants/months');

module.exports = function subtract(unit, value) {
  switch (unit) {
    case "year":
    case "Y":
    case "y":
      let curYear = this.get('year');
      this.set('year', Number(curYear)-value)
      return this;
    case "month":
    case "M":
      let curMon = this.get('month');
      if(Number(curMon)-value<=0){
        subtract.call(this,'year', Math.abs(Math.floor(((Number(curMon)-value) / 12))));
        this.set('month',12 + (Number(curMon)-value) % 12);
      }else{
        this.set('month', Number(curMon)-value)
        // FIXME: in this case, sometimes day is not valid
        if(shorts.includes(this.get('month'))){
          if(this.get('day') > '30'){
            this.set('day', '30')
          }
        }
      }
      return this;
    case "week":
    case "W":
    case "w":
      this.date = this.constructor.fromNumber(this.to('ms') - value * getTimeframeDurationInMilliseconds("W")).date
      return this;
    case "day":
    case "D":
    case "d":
      this.date = this.constructor.fromNumber(this.to('ms') - value * getTimeframeDurationInMilliseconds("d")).date
      return this;
    case "hour":
    case "H":
    case "h":
      this.date = this.constructor.fromNumber(this.to('ms') - value * getTimeframeDurationInMilliseconds("h")).date;
      return this;
    case "minute":
    case "min":
    case "m":
      this.date =  this.constructor.fromNumber(this.to('ms') - value * getTimeframeDurationInMilliseconds("m")).date;
      return this;
    case "second":
    case "sec":
    case "s":
      this.date =  this.constructor.fromNumber(this.to('ms') - value * getTimeframeDurationInMilliseconds("s")).date;
      return this;
    default:
      throw new Error(`Not handled unit ${unit}`);
  }

}
