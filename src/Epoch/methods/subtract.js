let getTimeframeDurationInMilliseconds = require('../utils/getTimeframeDurationInMilliseconds');
const { longs, shorts } = require('../constants/months');

module.exports = function subtract(unit, value) {
  switch (unit) {
    case "year":
      let curYear = this.get('year');
      this.set('year', Number(curYear)-value)
      return this;
    case "month":
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
      this.date = this.constructor.fromNumber(this.to('ms') - value * getTimeframeDurationInMilliseconds("W")).date
      return this;
    case "day":
      this.date = this.constructor.fromNumber(this.to('ms') - value * getTimeframeDurationInMilliseconds("d")).date
      return this;
    case "hour":
      this.date = this.constructor.fromNumber(this.to('ms') - value * getTimeframeDurationInMilliseconds("h")).date;
      return this;
    case "minute":
      this.date =  this.constructor.fromNumber(this.to('ms') - value * getTimeframeDurationInMilliseconds("m")).date;
      return this;
    case "second":
      this.date =  this.constructor.fromNumber(this.to('ms') - value * getTimeframeDurationInMilliseconds("s")).date;
      return this;
    default:
      throw new Error(`Not handled unit ${unit}`);
  }

}
