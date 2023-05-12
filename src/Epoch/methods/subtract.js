let getTimeframeDurationInMilliseconds = require('../utils/getTimeframeDurationInMilliseconds');

module.exports = function subtract(unit, value) {
  const curYear = this.get('year');
  switch (unit) {
    case "year":
    case "Y":
    case "y":
      this.set('year', Number(curYear)-value)
      return this;
    case "month":
    case "M":
      const curMon = this.get('month');
      const isLeapYear = curYear % 4 === 0 && curYear % 100 !== 0 || curYear % 400 === 0;

      if(Number(curMon) - value <= 0) {
        subtract.call(this,'year', Math.abs(Math.floor((Number(curMon)+value) / 12)));
        this.set('month',(Number(curMon) - value) % 12);
      } else {
        this.set('month', Number(curMon) - value);
        const newMonth = this.get('month');
        const daysInMonth = newMonth === "02" ? isLeapYear ? 29 : 28 : ["04", "06", "09", "11"].includes(newMonth) ? 30 : 31;
        if (this.get('day') > daysInMonth) {
          this.set('day', daysInMonth);
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
