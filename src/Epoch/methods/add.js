let milliSecondsInTimeframe = require('../utils/getTimeframeDurationInMilliseconds');
const { longs, shorts } = require('../constants/months');
module.exports = function add(unit, value) {
  switch (unit) {
    case "year":
      let curYear = this.get('year');
      this.set('year', Number(curYear)+value)
      return this;
    case "month":
      let curMon = this.get('month');
      if(Number(curMon)+value>12){
        add.call(this,'year', Math.floor((Number(curMon)+value) / 12));
        this.set('month',(Number(curMon)+value) % 12);
      }else{
        this.set('month', Number(curMon)+value)
        // FIXME
        // in this case, sometimes day is not valid
        if(shorts.includes(this.get('month'))){
          if(this.get('day') > '30'){
            this.set('day', '30')
          }
        }
      }
      return this;
    case "week":
      this.date = this.constructor.fromNumber(this.to('ms') + value * milliSecondsInTimeframe("W")).date
      return this;
    case "day":
      this.date = this.constructor.fromNumber(this.to('ms') + value * milliSecondsInTimeframe("d")).date
      return this;
    case "hour":
      this.date = this.constructor.fromNumber(this.to('ms') + value * milliSecondsInTimeframe("h")).date;
      return this;
    case "minute":
      this.date =  this.constructor.fromNumber(this.to('ms') + value * milliSecondsInTimeframe("m")).date;
      return this;
    case "second":
      this.date =  this.constructor.fromNumber(this.to('ms') + value * milliSecondsInTimeframe("s")).date;
      return this;
    default:
      throw new Error(`Not handled unit ${unit}`);
  }

}
