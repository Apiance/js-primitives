let milliSecondsInTimeframe = require('../utils/getTimeframeDurationInMilliseconds');
module.exports = function add(unit, value) {
  const curYear = this.get('year');
  switch (unit) {
    case "year":
    case "Y":
    case "y":
      this.set('year', Number(curYear)+value)
      return this;
    case "month":
    case "M":
      const curMon = this.get('month');
      const isLeapYear = curYear % 4 === 0 && curYear % 100 !== 0 || curYear % 400 === 0;
      if (Number(curMon) + value > 12) {
        add.call(this,'year', Math.floor((Number(curMon)+value) / 12));
        this.set('month',(Number(curMon)+value) % 12);
      } else {
        this.set('month', Number(curMon) + value);
        const newMonth = this.get('month');
        const daysInMonth = newMonth === 2 ? isLeapYear ? 29 : 28 : ["04", "06", "09", "11"].includes(newMonth) ? 30 : 31;
        if (this.get('day') > daysInMonth) {
          this.set('day', daysInMonth);
        }
      }
      return this;
    case "week":
    case "W":
    case "w":
      this.date = this.constructor.fromNumber(this.to('ms') + value * milliSecondsInTimeframe("W")).date
      return this;
    case "day":
    case "d":
      this.date = this.constructor.fromNumber(this.to('ms') + value * milliSecondsInTimeframe("d")).date
      return this;
    case "hour":
    case "h":
      this.date = this.constructor.fromNumber(this.to('ms') + value * milliSecondsInTimeframe("h")).date;
      return this;
    case "minute":
    case "min":
    case "m":
      this.date =  this.constructor.fromNumber(this.to('ms') + value * milliSecondsInTimeframe("m")).date;
      return this;
    case "second":
      this.date =  this.constructor.fromNumber(this.to('ms') + value * milliSecondsInTimeframe("s")).date;
      return this;
    default:
      throw new Error(`Not handled unit ${unit}`);
  }

}
