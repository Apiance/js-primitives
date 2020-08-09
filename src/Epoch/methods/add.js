let milliSecondsInTimeframe = {
  's' : 1000,
  'm' : 60000,
  'h' : 3600000,
  'd' : 86400000,
};
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
      }
      return this;
    case "day":
      this.date = this.constructor.fromNumber(this.to('ms') + value * milliSecondsInTimeframe["d"]).date
      return this;
    case "hour":
      this.date = this.constructor.fromNumber(this.to('ms') + value * milliSecondsInTimeframe["h"]).date;
      return this;
    case "minute":
      this.date =  this.constructor.fromNumber(this.to('ms') + value * milliSecondsInTimeframe["m"]).date;
      return this;
    case "second":
      this.date =  this.constructor.fromNumber(this.to('ms') + value * milliSecondsInTimeframe["s"]).date;
      return this;
    default:
      throw new Error(`Not handled unit ${unit}`);
  }

}
